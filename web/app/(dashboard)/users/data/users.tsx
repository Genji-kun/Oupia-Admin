type User = {
    id: string
    avatar: string
    fullName: string
    gender: "MALE" | "FEMALE" | "ORTHER"
    email: string
    dob: Date
    role: "TENANT" | "LANDLORD" | "ADMIN"
    isDeleted: boolean
}

export const users: User[] = [
    {
        id: "1",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Võ Phú Phát",
        gender: "MALE",
        email: "vophuphat@gmail.com",
        dob: new Date("11-14-2002"),
        role: "TENANT",
        isDeleted: true
    },
    {
        id: "2",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Nguyễn Kim Bảo Ngân",
        gender: "FEMALE",
        email: "nguyenkimbaongan@gmail.com",
        dob: new Date("02-06-2002"),
        role: "ADMIN",
        isDeleted: true
    },
    {
        id: "3",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Trần Lê Lân",
        gender: "FEMALE",
        email: "nguyenkimbaongan@gmail.com",
        dob: new Date("02-06-2002"),
        role: "ADMIN",
        isDeleted: false

    },
    {
        id: "1",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Võ Phú Phát",
        gender: "MALE",
        email: "vophuphat@gmail.com",
        dob: new Date("11-14-2002"),
        role: "LANDLORD",
        isDeleted: false

    },
    {
        id: "2",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Nguyễn Kim Bảo Ngân",
        gender: "FEMALE",
        email: "nguyenkimbaongan@gmail.com",
        dob: new Date("02-06-2002"),
        role: "LANDLORD",
        isDeleted: true

    },
    {
        id: "3",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Trần Lê Lân",
        gender: "MALE",
        email: "tranlelan@gmail.com",
        dob: new Date("02-06-2003"),
        role: "TENANT",
        isDeleted: false
    },
    {
        id: "4",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Võ Phú Phát",
        gender: "MALE",
        email: "vophuphat@gmail.com",
        dob: new Date("11-14-2002"),
        role: "TENANT",
        isDeleted: true
    },
    {
        id: "5",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Nguyễn Kim Bảo Ngân",
        gender: "FEMALE",
        email: "nguyenkimbaongan@gmail.com",
        dob: new Date("02-06-2002"),
        role: "LANDLORD",
        isDeleted: true
    },
    {
        id: "6",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Trần Lê Lân",
        gender: "MALE",
        email: "tranlelan@gmail.com",
        dob: new Date("02-06-2003"),
        role: "ADMIN",
        isDeleted: true
    },
    {
        id: "7",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Võ Phú Phát",
        gender: "MALE",
        email: "vophuphat@gmail.com",
        dob: new Date("11-14-2002"),
        role: "TENANT",
        isDeleted: true
    },
    {
        id: "8",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Nguyễn Kim Bảo Ngân",
        gender: "FEMALE",
        email: "nguyenkimbaongan@gmail.com",
        dob: new Date("02-06-2002"),
        role: "LANDLORD",
        isDeleted: false

    },
    {
        id: "9",
        avatar: "https://res.cloudinary.com/dzba4fewa/image/upload/v1697418342/bqiphv8ijowcb1ao2w8f.jpg",
        fullName: "Trần Lê Lân",
        gender: "FEMALE",
        email: "tranlelan@gmail.com",
        dob: new Date("02-06-2003"),
        role: "ADMIN",
        isDeleted: true
    },
]
