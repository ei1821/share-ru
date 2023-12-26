// src/components/Profile.js
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // ユーザー情報を取得する処理（仮定）
        // この部分は実際のアプリケーションに合わせて実装する必要があります
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('/api/user/profile'); // ユーザー情報を取得するAPIのエンドポイント
                const data = await response.json();
                setUser(data);
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
