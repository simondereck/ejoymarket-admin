import http from "./http-common"
import httpfile from "./http-file"

const requestGet = (url: string, response: any, error: any) =>{
    http.get(url).then(response).catch(function (errors) {
        if(errors.message.includes("401")){
            window.location.href = "/login";
        }
        error(errors);
    });
}

const requestPost = (url: string, data: any, response: any,error: any) =>{
    http.post(url,data).then(response).catch(function (errors) {
        if(errors.message.includes("401")){
            window.location.href = "/login";
        }
        error(errors);
    });
}


const adminLogin = (params: any,response: any, error: any) => {
    const url =  "/auth/admin/login";
    requestPost(url,params,response,error);
}

const getAllUsers = (params:any,response: any, error: any) => {
    const url = "/admin/user/users";
    requestPost(url,params,response,error);
}

const changeUserStatus = (params:any,response:any,error:any)=>{
    const url = "/admin/user/status/"+params.id;
    requestGet(url,response,error);
}

const getUserDetail = (params:any,response:any,error:any)=>{
    const url = "/admin/user/detail";
    requestPost(url,params,response,error);
}

const deleteUser = (params:any,response:any,error:any)=>{
    const url = "/admin/user/delete"
    requestPost(url,params,response,error);
}

const getAllAdmins = (params:any, response:any,error:any)=>{
    const url = "/admin/admins";
    requestPost(url,params,response,error);
}


const createAdmin = (params:any, response:any, error:any) => {
    const url = "/admin/signup";
    requestPost(url,params,response,error);
}

const deleteAdmin = (params:any, response:any, error:any) => {
    const url = "/admin/delete";
    requestPost(url,params,response,error);
}

const getAdminById = (params:any, response:any, error:any) =>{
    const url = "/admin/"+params.id;
    requestGet(url,response,error);
}

const updateAdmin = (params:any,response:any,error:any) => {
    const url = "/admin/update/"+params.id;
    requestPost(url,params,response,error)
}


const createCategory = (params:any, response:any ,error:any) => {
    const url = "/admin/category/create";
    requestPost(url,params,response,error);
}

const updateCategory = (id: number | undefined, params: any, response: any, error: any) => {
    let url = "/admin/category/update/";
    if(id){
        url += id;
    }else{
        url = url + "0";
    }
    requestPost(url,params,response,error);
}

const getAllCategories = (params:any,response:any,error:any) =>{
    const url = "/admin/category/all";
    requestPost(url,params,response,error);
}

const getAllCategoriesByPid = (pid:any,response:any,error:any) =>{
    const url = "/admin/category/all/"+pid;
    requestGet(url,response,error);
}

const deleteCategoryById = (id:any,response:any,error:any) => {
    const url = "/admin/category/delete/"+id;
    requestGet(url,response,error);
}

const getCategoryById = (id:any,response:any,error:any) => {
    const url = "/admin/category/"+id;
    requestGet(url,response,error);
}

const createReportMessage = (params:any,response:any,error:any) => {
    const url = "/admin/report/create";
    requestPost(url,params,response,error);
}


const getAllReportMessages = (params:any,response:any,error:any) => {
    const url = "/report/admin/all";
    requestPost(url,params,response,error);
}

const deleteReportById = (id:number,response:any,error:any) => {
    const url = "/report/admin/delete/"+id;
    requestGet(url,response,error);
}

const findReportById = (id:number,response:any,error:any) => {
    const url = "/report/admin/"+id;
    requestGet(url,response,error);
}

const updateReportById = (id:number,params:any,response:any,error:any) =>{
    const url = "/report/admin/update/"+id;
    requestPost(url,params,response,error);
}

const getAllCategoryConfigs = (params:any,response:any,error:any) =>{
    const url = "/category/config/admin/all";
    requestPost(url,params,response,error);
}

const createCategoryConfig = (params:any,response:any,error:any) => {
    const url = "/category/config/admin/create";
    requestPost(url,params,response,error);
}

const uploadCategoryCover = (data:any,response:any,error:any)=>{
    const url = "/admin/category/upload";
    requestPost(url,data,response,error);
}

const getAllCarousels = (data:any,response:any,error:any)=>{
    const url = "/admin/carousel/all";
    requestGet(url,response,error);
}

const getCarouselDetail = (data:any,response:any,error:any)=>{
    const url = "/admin/carousel/detail";
    requestPost(url,data,response,error);
}
const uploadCarouselImage = (data:any,response:any,error:any) =>{
    const url = "/admin/carousel/upload";
    requestPost(url,data,response,error);
}
const createCarousel = (data:any,response:any,error:any) => {
    const url = "/admin/carousel/create";
    requestPost(url,data,response,error);
}
const deleteCarousel = (data:any,response:any,error:any) => {
    const url = "/admin/carousel/delete";
    requestPost(url,data,response,error);
}
const updateCarousel = (data:any,response:any,error:any) => {
    const url = "/admin/carousel/update";
    requestPost(url,data,response,error);
}
const updateCarouselConfig = (data:any,response:any,error:any) => {
    const url = "/admin/carousel/config/update";
    requestPost(url,data,response,error);
}

const getAllLanguages = (data:any,response:any,error:any) => {
    const url = "/data/language/all";
    requestGet(url,response,error);
}

const getAllCountries = (data:any,response:any,error:any) => {
    const url = "/data/country/all";
    requestGet(url,response,error);

}

export {
    adminLogin,
    getAllUsers,
    changeUserStatus,
    getAllAdmins,
    createAdmin,
    deleteAdmin,
    getAdminById,
    updateAdmin,
    createCategory,
    getAllCategories,
    getAllCategoriesByPid,
    deleteCategoryById,
    getCategoryById,
    updateCategory,
    createReportMessage,
    getAllReportMessages,
    deleteReportById,
    findReportById,
    updateReportById,
    createCategoryConfig,
    getAllCategoryConfigs,
    getUserDetail,
    deleteUser,
    uploadCategoryCover,
    getAllCarousels,
    uploadCarouselImage,
    createCarousel,
    deleteCarousel,
    updateCarousel,
    updateCarouselConfig,
    getAllLanguages,
    getAllCountries,
    getCarouselDetail,
};