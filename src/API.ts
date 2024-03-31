import axios from "axios";
import { UsersDataType } from "./redux/usersReducer";
import { PhotosType, ProfileType } from "./redux/profileReducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '91621232-aeeb-4085-9ee7-30a301e87b63'    
    }
})

type GetUsersType = {
    items: Array<UsersDataType>
    totalCount: number,
    error: string,
    term: string
}
export const getUsers = (currentPage: number, pageSize: number, term: string) => {
    return instance
    .get<GetUsersType>(`/users?page=${currentPage}&count=${pageSize}&term=${term}`)
    .then(responce => responce.data)
}

type GetUserProfileType = ProfileType
export const getUserProfile = (userId: number) => {
    return instance
    .get<GetUserProfileType>(`/profile/${userId}`)
    .then(responce => responce.data)
}

type GetUserStatusType = string
export const getUserStatus = (userId: number) => {
    return instance
    .get<GetUserStatusType>(`/profile/status/${userId}`)
    .then(responce => responce.data)
}

type UpdateUserStatusType = {
    data: {}, 
    resultCode: number, 
    messages: Array<string>
}
export const updateUserStatus = (status: string) => {
    return instance
    .put<UpdateUserStatusType>(`/profile/status`, {status: status})
}

type SaveUserAvatarType = {
    data: {photos: PhotosType},
    messages: Array<string>,
    resultCode: number
}
export const saveUserAvatar = (avatar: any) => {
    let formData = new FormData()
    formData.append("image", avatar)
    return instance
    .put<SaveUserAvatarType>(`/profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
}

type SaveAboutMeType = {
    data: {}, 
    resultCode: number, 
    messages: Array<string>
}
export const saveAboutMe = (profile: ProfileType) => {
    return instance
    .put<SaveAboutMeType>(`/profile`, {...profile})
}

type GetLoginDataType = {
    data: {login: string, email: string, id: number},
    resultCode: number,
    messages: Array<string>
}
export const getLoginData = () => {
    return instance
    .get<GetLoginDataType>(`/auth/me`)
    .then(responce => responce.data)
}

type LoginType = {
    data: {userId: number},
    resultCode: number,
    messages: Array<string>
}
export const login = (email: string, password: string, rememberMe = false, captcha: string) => {
    debugger
    return instance
    .post<LoginType>(`auth/login`, {email, password, rememberMe, captcha})
    .then(responce => responce.data)
}

type LogoutType = {
    data: {},
    messages: Array<string>,
    resultCode: number
}
export const logout = () => {
    return instance
    .delete<LogoutType>(`auth/login`)
    .then(responce => responce.data)
}

type GetCaptchaUrlType = {
    url: string    
}
export const getCaptchaUrl = () => {
    return instance.
    get<GetCaptchaUrlType>(`security/get-captcha-url`)
}

export type OnUserFollowType = {
    data: {},
    messages: Array<string>,
    resultCode: number    
}
export const onUserFollow = (userId: number) => {
    return instance
    .post<OnUserFollowType>(`/follow/${userId}`, {})
    .then(responce => responce.data)
}

export type OnUserUnfollowType = {
    data: {},
    messages: Array<string>,
    resultCode: number 
}
export const onUserUnfollow = (userId: number) => {
    return instance
    .delete<OnUserUnfollowType>(`/follow/${userId}`)
    .then(responce => responce.data)
}