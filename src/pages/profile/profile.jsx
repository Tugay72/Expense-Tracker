import './profile.css';
import React, { useEffect, useState } from 'react';
import SidebarLayout from '../../components/sidebar/siderbar';
import BASE_URL from '../../config';
import { Skeleton } from 'antd';

const Profile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch(`${BASE_URL}/api/auth/user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setUser({
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email
                    });
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("Kullanıcı bilgisi alınamadı:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="profile-page">
                <SidebarLayout>
                    <div className="profile-card">
                        <h1>Profil Bilgileri</h1>
                        <Skeleton active />
                    </div>
                </SidebarLayout>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <SidebarLayout>
                <div className="profile-card">
                    <h1>Profil Bilgileri</h1>
                    <div className="profile-info">
                        <p><strong>Ad:</strong> {user.firstName}</p>
                        <p><strong>Soyad:</strong> {user.lastName}</p>
                        <p><strong>E-Posta:</strong> {user.email}</p>
                    </div>
                </div>
            </SidebarLayout>
        </div>
    );
};

export default Profile;
