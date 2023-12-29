import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//APIURL

const getToken = (tokenType = "accessToken") => {
    const token = localStorage.getItem(tokenType);
    return { Authorization: "JWT " + token };
}

// インスタンスを作る
const ax = axios.create({
    headers: getToken(),
});

ax.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            const navigate = useNavigate();
            navigate(0);
        }
        return Promise.reject(error);
    }
)

export default ax;