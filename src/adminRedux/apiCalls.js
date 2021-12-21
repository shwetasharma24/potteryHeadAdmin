import { publicRequest, userRequest } from "../axios/requestMethods";
import { getProductStart, getProductFailure, getProductSuccess, deleteProductStart, deleteProductSuccess, deleteProductFailure, updateProductStart, updateProductSuccess, updateProductFailure, addProductStart, addProductSuccess, addProductFailure } from "./productRedux";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from "./userRedux";
import { getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "./usersRedux";

//USER
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        
    }
    catch(err){
        dispatch(loginFailure());
    }
}

export const logout = async (dispatch, user) => {
    dispatch(logoutStart());
    try{
        dispatch(logoutSuccess());
        
    }
    catch(err){
        dispatch(logoutFailure());
    }
}


//PRODUCTS
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try{
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    }
    catch(err){
        dispatch(getProductFailure());
    }
}


export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try{
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    }
    catch(err){
        dispatch(deleteProductFailure());
    }
}


export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try{
        const res = await userRequest.put(`products/${id}`, product);
        dispatch(updateProductSuccess({id, product}));
    }
    catch(err){
        dispatch(updateProductFailure());
    }
}


export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try{
        const res = await userRequest.post(`/products/add`, product);
        dispatch(addProductSuccess(res.data));
    }
    catch(err){
        dispatch(addProductFailure());
    }
}



//USERS
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try{
        const res = await userRequest.get("/users");
        dispatch(getUsersSuccess(res.data));
    }
    catch(err){
        dispatch(getUsersFailure());
    }
}


export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try{
        const res = await userRequest.put(`/users/${id}`, user);
        dispatch(updateUserSuccess({id, user}));
    }
    catch(err){
        dispatch(updateUserFailure());
    }
}