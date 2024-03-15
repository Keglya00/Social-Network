import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '91621232-aeeb-4085-9ee7-30a301e87b63'    
    }
})

export const getUsers = (currentPage, pageSize) => {
    return instance
    .get(`/users?page=${currentPage}&count=${pageSize}`)
    .then(responce => responce.data)
}

export const getUserProfile = (userId) => {
    return instance
    .get(`/profile/${userId}`)
    .then(responce => responce.data)
}

export const getUserStatus = (userId) => {
    return instance
    .get(`/profile/status/${userId}`)
    .then(responce => responce.data)
}

export const updateUserStatus = (status) => {
    return instance
    .put(`/profile/status`, {status: status})
}

export const saveUserAvatar = (avatar) => {
    let formData = new FormData()
    formData.append("image", avatar)
    return instance
    .put(`/profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
}

export const getLoginData = () => {
    return instance
    .get(`/auth/me`)
    .then(responce => responce.data)
}

export const login = (email, password, rememberMe) => {
    return instance
    .post(`auth/login`, {email, password, rememberMe})
    .then(responce => responce.data)
}

export const logout = () => {
    return instance
    .delete(`auth/login`)
    .then(responce => responce.data)
}

export const onUserFollow = (userId) => {
    return instance
    .post(`/follow/${userId}`, {})
    .then(responce => responce.data)
}

export const onUserUnfollow = (userId) => {
    return instance
    .delete(`/follow/${userId}`)
    .then(responce => responce.data)
}