import "./Settings.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/api-request";
import useAuthStore from "../../utils/authStore";
import AvatarUploader from "../../components/AvatarUploader/AvatarUploader";
import { useState } from "react";

const Settings = () => {
    const queryClient = useQueryClient();
    const { currentUser, setCurrentUser } = useAuthStore();
    console.log(currentUser)
    const [formData, setFormData] = useState({
        displayName: currentUser.displayName,
        username: currentUser.username,
        email: currentUser.email
    });

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await apiRequest.patch('/users/profile', data)
            return res.data
        },
        onSuccess: (data) => {
            const oldUsername = currentUser.username;
            const newUsername = data.data.username;
            
            setCurrentUser(data.data);
            queryClient.invalidateQueries(['user', oldUsername]);
            queryClient.invalidateQueries(['user', newUsername]);
          
        },
        onError: (error) => {
            alert(error.response?.data?.error || 'Update failed');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username.match(/^[a-z0-9_]+$/)) {
            return alert('Username can only contain lowercase letters, numbers and underscores');
        }
        updateProfile(formData);
        
    };

    const handleImageUpload = (newAvatarUrl) => {
        setCurrentUser(prev => ({ ...prev, img: newAvatarUrl }));
    };

   

    return (
        <div className="settings-container">
            <h1>Account Settings</h1>
            
            <div className="avatar-section">
                <AvatarUploader 
                    currentImage={currentUser.img}
                    onUpload={handleImageUpload}
                />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Display Name</label>
                    <input
                        value={formData.displayName}
                        onChange={(e) => setFormData({
                            ...formData,
                            displayName: e.target.value
                        })}
                        required
                        minLength="3"
                        maxLength="30"
                    />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        value={formData.username}
                        onChange={(e) => setFormData({
                            ...formData,
                            username: e.target.value.toLowerCase()
                        })}
                        pattern="[a-zA-Z0-9_]+"
                        title="Only letters, numbers and underscores"
                        required
                        minLength="4"
                        maxLength="20"
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({
                            ...formData,
                            email: e.target.value
                        })}
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isPending}
                    aria-busy={isPending}
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default Settings;