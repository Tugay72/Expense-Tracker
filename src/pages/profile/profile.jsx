import './profile.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const profile = {
        firstName: "Ahmet",
        lastName: "Yılmaz",
        email: "ahmet.yilmaz@example.com"
    };

    return (
        <div className="profile-card">
            <h1>Profil Bilgileri</h1>
            <div className="profile-info">
                <p><strong>Ad:</strong> {profile.firstName}</p>
                <p><strong>Soyad:</strong> {profile.lastName}</p>
                <p><strong>E-Posta:</strong> {profile.email}</p>
            </div>
        </div>
    );
};

export default Profile;