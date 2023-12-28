// src/components/Login.js
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { authActions } from '../stores';
import { useNavigate } from 'react-router-dom';

const Login = ({  }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuth);

    const onLogin = () => {
        console.log('onLogin');
        dispatch(authActions.login());
        navigate('/');
        
    };
    const onLogout = () => dispatch(authActions.logout());

    useEffect(() => {
        console.log('isAuthenticated: ', isAuthenticated);
        if (isAuthenticated) {
            onLogin();
        }
    }, []);

    const handleLogin = async () => {
        // ログイン処理

        try {
            const response = await axios.post('/api/auth/jwt/create/', {
                user_id: userId,
                password,
            });

            console.log(response);

            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;

            console.log(accessToken);
            console.log(refreshToken);

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            onLogin();

            // ローカルストレージにトークンを保存
            // localStorage.setItem('token', token);

            // ログイン成功時に親コンポーネントに通知
            // onLogin();

        } catch (error) {
            console.error('Error logging in', error);
        }

    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="UserId" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
