import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//APIURL

const getToken = (tokenType = "accessToken") => {
    const token = localStorage.getItem(tokenType);
    return { Authorization: "JWT " + token };
}

// インスタンスを作る
const ax = axios.create({
    // headers: getToken(),
});

// axiosの実行のたびにトークンをheaderに乗せる
// それ用の関数
const setToken = (config, tokenType = "accessToken") => {
    const token = localStorage.getItem(tokenType);
    console.log(token);
    config.headers = { Authorization: "JWT " + token };
    return config;
}

ax.interceptors.request.use(
    config => {
        config = setToken(config);
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

ax.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            window.location.reload();
            // const navigate = useNavigate();
            // navigate(0);
        }
        return Promise.reject(error);
    }
);

export default ax;
export { getToken };