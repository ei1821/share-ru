// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import ax from '../api/Axios';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // ユーザー情報を取得する処理（仮定）
        // この部分は実際のアプリケーションに合わせて実装する必要があります
        const fetchUserProfile = async () => {
            try {
                ax.get("/api/auth/users/me")
                .then((res) => {
                    console.log(res.data);
                    // setUser(res.data);
                })
                .error((err) => {
                    console.log(err);
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            {user ? (
                <>
                    <p>Welcome, {user.username}!</p>
                    <p>Email: {user.email}</p>
                </>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default Profile;
