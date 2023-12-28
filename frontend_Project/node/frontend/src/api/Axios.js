import axios from 'axios';

//APIURL

const getToken = (tokenType = "accessToken") => {
    const token = localStorage.getItem(tokenType);
    return {Authorization: "JWT " + token};
}

// インスタンスを作る
const ax = axios.create({});
ax.interceptors.response.use(
    response => response,
    error => {
        
    }
)


export default ax;