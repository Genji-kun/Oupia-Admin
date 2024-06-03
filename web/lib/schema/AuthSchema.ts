import { z } from "zod";

export const loginSchema = z.object({
    username: z.string({
        required_error: "Tên tài khoản không được bỏ trống",
    }),
    password: z.string({
        required_error: "Mật khẩu không được bỏ trống",
    })
});