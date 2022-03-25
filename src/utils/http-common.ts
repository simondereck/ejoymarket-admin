import axios from "axios";
import {getToken} from './accessToken';
const token = getToken();
export default axios.create({
    baseURL:  process.env.REACT_APP_BASE_URL,
    headers:  {
        "Content-type": "application/json",
        'Authorization': `Bearer ${token}`,
    }
});
