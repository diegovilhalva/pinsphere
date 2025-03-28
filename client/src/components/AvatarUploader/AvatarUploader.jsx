import "./AvatarUploader.css";
import { useState, useRef } from "react";
import apiRequest from "../../utils/api-request";

const AvatarUploader = ({ currentImage, onUpload }) => {
    const [preview, setPreview] = useState(currentImage);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
      
        try {
          setIsUploading(true);
          
          // Criar preview
          const reader = new FileReader();
          reader.onload = (e) => setPreview(e.target.result);
          reader.readAsDataURL(file);
      
          // Enviar para novo endpoint
          const formData = new FormData();
          formData.append('avatar', file);
          
          const response = await apiRequest.patch('/users/profile/avatar', formData);
          
          // Atualizar estado global
          onUpload(response.data.data.img);
        } catch (error) {
          alert('Failed to upload avatar');
          setPreview(currentImage);
        } finally {
          setIsUploading(false);
        }
      }

    return (
        <div className="avatar-uploader">
            <div className="avatar-preview">
                {isUploading && <div className="loading-overlay">Uploading...</div>}
                <img 
                    src={preview} 
                    alt="Avatar preview" 
                    style={{ opacity: isUploading ? 0.7 : 1 }}
                />
            </div>
            
            <label className="upload-button" aria-disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Change Photo'}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleUpload}
                    disabled={isUploading}
                    hidden
                />
            </label>
        </div>
    );
};

export default AvatarUploader;