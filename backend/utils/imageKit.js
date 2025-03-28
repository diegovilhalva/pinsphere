
import ImageKit from 'imagekit';
import dotenv from "dotenv"

dotenv.config()

const imagekit = new ImageKit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT
});


export const uploadImage = async (fileBuffer, fileName, folder) => {
    try {
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: fileName,
        folder: folder,
        useUniqueFileName: true // Adicione esta linha
      });
  
      return {
        url: response.url,
        fileId: response.fileId
      };
  
    } catch (error) {
      console.error('ImageKit upload error:', error);
      throw new Error(`Upload error: ${error.message}`);
    }
  };
export const deleteImage = async (fileId) => {
    try {
        await imagekit.deleteFile(fileId);
    } catch (error) {
        console.error(`Failed to delete image: ${fileId}`);
    }
};