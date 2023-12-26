// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignup = async () => {
        // ログイン処理

        try {
            const response = await axios.post('api/auth/users/', {
                user_id: username,
                email,
                password,
            });

            let data = response.data;

            console.log(data);


        } catch (error) {
            console.error('Error logging in', error);
        }

    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Register</button>
        </div>
    );
};

export default Signup;
