import { IUserLogin } from "@/types/interfaces";
import BaseService from "./BaseService";
import { AUTH_ENDPOINTS } from "@/lib/constants/EndPoints";

class AuthService extends BaseService {
    constructor() {
        super();
    }

    login = (userLogin: IUserLogin) => {
        return this.post(AUTH_ENDPOINTS.SIGN_IN, userLogin);
    };

    currentUser = (accessToken: string) => {
        return this.get(AUTH_ENDPOINTS.CURRENY_USER, accessToken);
    }
}


export const authService = new AuthService();