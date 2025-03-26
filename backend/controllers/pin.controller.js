import Pin from "../models/pin.model.js";
import Board from "../models/board.model.js"
import mongoose from "mongoose"
import sharp from "sharp"
import ImageKit from "imagekit"
export const getPins = async (req, res) => {
    try {
        const limit = 21;
        const cursor = parseInt(req.query.cursor) || 0;
        const search = req.query.search;
        const userId = req.query.userId
        const boardId = req.query.boardId
        const query = {};

        if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid user ID format'
                });
            }
            query.user = userId;
        }
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { title: { $regex: searchRegex } },
                { tags: { $in: [searchRegex] } }
            ];
        }

        if (boardId) {
            query.board = boardId
        }


        const pins = await Pin.find(query)
            .sort({ createdAt: -1 })
            .skip(cursor * limit)
            .limit(limit + 1);

        const hasNextPage = pins.length > limit;
        const results = hasNextPage ? pins.slice(0, -1) : pins;


        if (process.env.NODE_ENV === 'development') {
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        res.status(200).json({
            success: true,
            data: results,
            nextCursor: hasNextPage ? cursor + 1 : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch pins'
        });
    }
};

export const getPin = async (req, res) => {
    try {
        const { id } = req.params

        const pin = await Pin.findById(id).populate("user", "username img displayName")

        res.status(200).json({ success: true, data: pin })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch pin'
        })
    }
}

export const createPin = async (req, res) => {
    
        const {
            title,
            description,
            link,
            board,
            tags,
            textOptions,
            canvasOptions,
            newBoard,
        } = req.body

        const media = req.files.media

        if ((!title, !description, !media)) {
            return res.status(400).json({ success: false, error: "All fields are required!" })
        }

        const parsedTextOptions = JSON.parse(textOptions || "{}")
        const parsedCanvasOptions = JSON.parse(canvasOptions || "{}")

        const metadata = await sharp(media.data).metadata()

        const originalOrientation =
            metadata.width < metadata.height ? "portrait" : "landscape"
        const originalAspectRatio = metadata.width / metadata.height

        let clientAspectRatio
        let width
        let height

        if (parsedCanvasOptions.size !== "original") {
            clientAspectRatio =
                parsedCanvasOptions.size.split(":")[0] /
                parsedCanvasOptions.size.split(":")[1]
        } else {
            parsedCanvasOptions.orientation === originalOrientation
                ? (clientAspectRatio = originalOrientation)
                : (clientAspectRatio = 1 / originalAspectRatio)
        }

        width = metadata.width;
        height = metadata.width / clientAspectRatio

        const imageKit = new ImageKit({
            publicKey: process.env.IK_PUBLIC_KEY,
            privateKey: process.env.IK_PRIVATE_KEY,
            urlEndpoint: process.env.IK_URL_ENDPOINT
        })

        const textLeftPosition = Math.round((parsedTextOptions.left * width) / 375);
        const textTopPosition = Math.round(
            (parsedTextOptions.top * height) / parsedCanvasOptions.height
        )

        let croppingStrategy = "";

        if (parsedCanvasOptions.size !== "original") {
            if (originalAspectRatio > clientAspectRatio) {
                croppingStrategy = ",cm-pad_resize";
            }
        } else {
            if (
                originalOrientation === "landscape" &&
                parsedCanvasOptions.orientation === "portrait"
            ) {
                croppingStrategy = ",cm-pad_resize";
            }
        }

        const transformationString = `w-${width},h-${height}${croppingStrategy},bg-${parsedCanvasOptions.backgroundColor.substring(
            1
        )}${parsedTextOptions.text
            ? `,l-text,i-${parsedTextOptions.text},fs-${parsedTextOptions.fontSize * 2.1
            },lx-${textLeftPosition},ly-${textTopPosition},co-${parsedTextOptions.color.substring(
                1
            )},l-end`
            : ""
            }`

        imageKit
            .upload({
                file: media.data,
                fileName: media.name,
                folder: "pins",
                transformation: {
                    pre: transformationString,
                },
            })
            .then(async (response) => {

                let newBoardId;

                if (newBoard) {
                    const res = await Board.create({
                        title: newBoard,
                        user: req.userId,
                    });
                    newBoardId = res._id;
                }

                const newPin = await Pin.create({
                    user: req.userId,
                    title,
                    description,
                    link: link || null,
                    board: newBoardId || board || null,
                    tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
                    media: response.filePath,
                    width: response.width,
                    height: response.height,
                });
                return res.status(201).json({ success: true, data: newPin });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({success:false,error:"Failed to create pin"});
            });

   
}