import {AdminData} from "../data/AdminData";

const label = "access-token";
const adminLabel = "admin";

export const setToken = (token:string) => {
    localStorage.setItem(label,token);
}
export const getToken = () => {
    return localStorage.getItem(label);
}
export const removeToken = () => {
    localStorage.removeItem(label);
}
export const isAuthenticated = () => {
    return localStorage.getItem(label)? true :false;
}

export const setAdminInfo = (admin:AdminData) => {
    localStorage.setItem(adminLabel,JSON.stringify(admin));
}

export const getAdminInfo = () => {
    let adminStr = localStorage.getItem(adminLabel);
    if (adminStr){
       let admin:AdminData = JSON.parse(adminStr);
       return admin;
    }
    return null;
}