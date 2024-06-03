import { POST_ENDPOINTS } from "@/lib/constants/EndPoints";
import BaseService from "./BaseService";

class PostService extends BaseService {
    constructor() {
        super();
    }

    createPost = (form: FormData) => {
        return this.post(POST_ENDPOINTS.CREATE, form);
    }

    updatePost = (id: number, form: FormData) => {
        return this.put(POST_ENDPOINTS.UPDATE(id), form);
    }

    deleltePost = (id: number) => {
        return this.delete(POST_ENDPOINTS.DELETE(id));
    }

}

export const postService = new PostService();