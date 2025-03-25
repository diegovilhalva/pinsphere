import { useState } from 'react'
import useEditorStore from '../../utils/editorStore'
import { HexColorPicker } from "react-colorful"
const Options = ({previewImg}) => {
    const portraitSizes = [
        {
            name: "1:2",
            width: 1,
            height: 2,
        },
        {
            name: "9:16",
            width: 9,
            height: 16,
        },
        {
            name: "2:3",
            width: 2,
            height: 3,
        },
        {
            name: "3:4",
            width: 3,
            height: 4,
        },
        {
            name: "4:5",
            width: 4,
            height: 5,
        },
        {
            name: "1:1",
            width: 1,
            height: 1,
        },
    ];

    const landscapeSizes = [
        {
            name: "2:1",
            width: 2,
            height: 1,
        },
        {
            name: "16:9",
            width: 16,
            height: 9,
        },
        {
            name: "3:2",
            width: 3,
            height: 2,
        },
        {
            name: "4:3",
            width: 4,
            height: 3,
        },
        {
            name: "5:4",
            width: 5,
            height: 4,
        },
        {
            name: "1:1",
            width: 1,
            height: 1,
        },
    ];
    const { selectedLayer, textOptions, setTextOptions, setCanvasOptions, canvasOptions } = useEditorStore()
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

    const originalOrientation =
        previewImg.width < previewImg.height ? "portrait" : "landscape";
    const handleSizeClick = (size) => {
        let newHeight

        if (size === "original") {
            if (originalOrientation === canvasOptions.orientation) {
                newHeight = (375 * previewImg.height) / previewImg.width
            }else{
                newHeight = (375 * previewImg.width) / previewImg.height
            }
        }else{
            newHeight = (375 * size.height) / size.width
        }
        setCanvasOptions({ ...canvasOptions, size: size === "original" ? "original": size.name, 
            height: newHeight })
    }

    const handleOrientationClick = (orientation) => {
        let newHeight;

        if (originalOrientation === orientation) {
          newHeight = (375 * previewImg.height) / previewImg.width;
        } else {
          newHeight = (375 * previewImg.width) / previewImg.height;
        }
    
        setCanvasOptions({
          ...canvasOptions,
          orientation,
          size: "original",
          height: newHeight,
        });
    }
    return (
        <div className='options'>
            {selectedLayer === "text" ?
                (<div className=''>
                    <div className="editing-option">
                        <span>Font Size</span>
                        <input type="number" value={textOptions.fontSize} onChange={(e) => setTextOptions({ ...textOptions, fontSize: e.target.value })} />
                    </div>
                    <div className="editing-option">
                        <span>Color</span>
                        <div className="text-color">
                            <div className="color-preview" style={{ backgroundColor: textOptions.color }} onClick={() => setIsColorPickerOpen((prev) => !prev)} />
                            {isColorPickerOpen && <div className='color-picker'>
                                <HexColorPicker color={textOptions.color} onChange={(color) => setTextOptions({ ...textOptions, color: color })} />
                            </div>}
                        </div>
                    </div>
                </div>) : (
                    <div className="">
                        <div className="editing-option">
                            <span>Orientation</span>
                            <div className="orientations">
                                <div className={`orientation ${canvasOptions.orientation === "portrait" ? "selected" : ""}`} onClick={() => handleOrientationClick("portrait")} >P</div>
                                <div className={`orientation ${canvasOptions.orientation === "landscape" ? "selected" : ""
                                    }`} onClick={() => handleOrientationClick("landscape")} >L</div>
                            </div>
                        </div>
                        <div className="editing-option">
                            <span>Size</span>
                            <div className="sizes">
                                <div className={`size ${canvasOptions.size === "original" ? "selected" : ""
                                    }`} onClick={() => handleSizeClick("original")}>
                                    Original
                                </div>
                                {canvasOptions.orientation === "portrait" ? (<>
                                    {portraitSizes.map((size) => (
                                        <div className={`size ${canvasOptions.size === size.name ? "selected" : ""
                                            }`} key={size.name} onClick={() => handleSizeClick(size)}>
                                            {size.name}
                                        </div>
                                    ))}
                                </>) : (
                                    <>
                                        {landscapeSizes.map((size) => (
                                            <div className={`size ${canvasOptions.size === size.name ? "selected" : ""
                                                }`} key={size.name} onClick={() => handleSizeClick(size)}>
                                                {size.name}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="editing-option">
                            <span>Background Color</span>
                            <div className="bg-color">
                                <div className="text-color">
                                    <div className="color-preview" style={{ backgroundColor: canvasOptions.backgroundColor }} onClick={() => setIsColorPickerOpen((prev) => !prev)} />
                                    {isColorPickerOpen && <div className='color-picker'>
                                        <HexColorPicker color={canvasOptions.backgroundColor}
                                            onChange={(color) => setCanvasOptions({ ...canvasOptions, backgroundColor: color })} />
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Options