import { USER_ENDPOINTS } from "@/lib/constants/EndPoints";
import BaseService from "./BaseService";

class UserService extends BaseService {
    constructor() {
        super();
    }

    createUser = (form: FormData) => {
        return this.post(USER_ENDPOINTS.CREATE, form);
    }

    updateUser = (id: number, form: FormData) => {
        return this.put(USER_ENDPOINTS.UPDATE(id), form);
    }

    delelteUser = (id: number) => {
        return this.delete(USER_ENDPOINTS.DELETE(id));
    }

}

export const userService = new UserService();