"use client"

import { CurrentUser } from '@/interfaces/User';
import { useRouter } from 'next/navigation';
import cookie from 'react-cookies'

export interface Action {
    type: string;
    payload?: CurrentUser;
}

const UserReducer = (currentState: CurrentUser | null, action: Action): CurrentUser | null => {
    const router = useRouter();

    switch (action.type) {
        case "login":
            return action.payload || null;
        case "logout":
            cookie.remove("token");
            cookie.remove("user");
            router.push("/sign-in")
            return null;
        default:
    }
    return currentState;
};

export default UserReducer;