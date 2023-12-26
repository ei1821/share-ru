// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        // ログイン処理

        try {
            const response = await axios.post('/api/user/login', {
                username,
                password,
            });

            const token = response.data.token;

            // ローカルストレージにトークンを保存
            localStorage.setItem('token', token);

            // ログイン成功時に親コンポーネントに通知
            onLogin();


        } catch (error) {
            console.error('Error logging in', error);
        }

    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
