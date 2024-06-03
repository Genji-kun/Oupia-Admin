
export interface CurrentUser {
    id: number,
    fullName: string,
    avatar: string,
    username: string,
    role: "ROLE_ADMIN" | "ROLE_LANDLORD" | "ROLE_TENANT"
}

export interface UserResponse {
    id: number,
    fullName: string,
    email: string,
    phoneNumber: string,
    username: string,
    avatar: string,

    createdAt: Date,
    dob: Date,

    gender: "MALE" | "FEMALE" | "OTHER",
    role: "ROLE_TENANT" | "ROLE_LANDLORD" | "ROLE_ADMIN",
}

export interface UserRequest {
    fullName: string,
    email: string,
    phoneNumber: string,
    username: string,
    avatar: string,

    createdAt: Date,
    dob: Date,

    gender: "MALE" | "FEMALE" | "OTHER",
    role: "ROLE_TENANT" | "ROLE_LANDLORD" | "ROLE_ADMIN",
}