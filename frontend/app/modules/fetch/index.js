import { Asul } from "next/font/google";
import { instance } from "../axios";


async function getCategories(){
    try {
        const response = await instance.get("/categories");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getCategory(id){
    try {
        const response = await instance.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function createCategory(formData){
    try {
        const response = await instance.post("/categories", formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function updateCategory(id, formData){
    try {
        const response = await instance.put(`/categories/${id}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function deleteCategory(id){
    try {
        const response = await instance.delete(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getOrders(){
    try {
        const response = await instance.get("/orders");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getOrderById(id){
    try {
        const response = await instance.get(`/orders/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function createOrder(formData){
    try {
        const response = await instance.post("/orders", formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function updateOrder(id, formData){
    try {
        const response = await instance.put(`/orders/${id}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function deleteOrder(id){
    try {
        const response = await instance.delete(`/orders/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getTotalSales(){
    try {
        const response = await instance.get("/orders/total-sales");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getOrderCount(){
    try {
        const response = await instance.get("/orders/count");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getUserOrderList(id){
    try {
        const response = await instance.get(`/orders/user/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getProducts(){
    try {
        const response = await instance.get("/products");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getProductById(id){
    try {
        const response = await instance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function createProduct(formData){
    try {
        const response = await instance.post("/products", formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function updateProduct(id, formData){
    try {
        const response = await instance.put(`/products/${id}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function deleteProduct(id){
    try {
        const response = await instance.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function countProducts(){
    try {
        const response = await instance.get("/products/count");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getFeaturedProducts(count){
    try {
        const response = await instance.get(`/products/featured/${count}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function uploadImages(formData){
    try {
        const response = await instance.post("/upload", formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getUsers(){
    try {
        const response = await instance.get("/users");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function getUserById(id){
    try {
        const response = await instance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function createUser(formData){
    try {
        const response = await instance.post("/users", formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function updateUser(id, formData){
    try {
        const response = await instance.put(`/users/${id}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function deleteUser(id){
    try {
        const response = await instance.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}


async function countUsers(){
    try {
        const response = await instance.get("/users/count");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function login(formData){
    try {
        const response = await instance.post("/users/login", formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}

async function register(formData){
    try {
        const response = await instance.post("/users/register", formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || error.message || "Something went wrong")
    }
}


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    countProducts,
    getFeaturedProducts,
    uploadImages,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    countUsers,
    login,
    register,
    getUserOrderList,
    getOrders,
    getOrderById,
    getTotalSales,
    createOrder,
    updateOrder,
    deleteOrder,
    getCategories,
    getOrderCount,
    getCategory,
    updateCategory,
    createCategory,
    deleteCategory
}