import { useAppContext } from "@/contexts/app-context";
import { POST_ENDPOINTS } from "@/lib/constants/EndPoints";
import { authService } from "@/services/AuthService";
import { postService } from "@/services/PostService";
import { IUserLogin } from "@/types/interfaces";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import cookies from "react-cookies";
import { UserRole } from "@/types/enums";
import { assetService } from "@/services/AssetService";

export const useLogin = () => {

    const { dispatch } = useAppContext();
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: IUserLogin) => {
            const { data } = await authService.login(form);
            const { data: currentUserInfo } = await authService.currentUser(data.accessToken);
            if (currentUserInfo.role === UserRole.ADMIN) {
                localStorage.setItem("accessToken", data.accessToken);
                cookies.save("user", currentUserInfo, {});

                dispatch({
                    type: "login",
                    payload: currentUserInfo
                });
                router.push("/");
            } else {
                throw new Error("Bạn không có quyền truy cập, vui lòng thử tài khoản khác.");
            }
        }, onError() {
            toast("Tài khoản hoặc tên đăng nhập không chính xác, vui lòng thử lại.");
        }
    })

    return {
        mutateLogin: mutateAsync,
        isPendingLogin: isPending
    }
}


// ------------------- USER MUTATION ------------------------ //


export const useCreateUser = () => {
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            return await postService.createPost(form);
        }, onSuccess() {
            toast.success("Tạo người dùng thành công.");
            router.back();
        },
    })

    return {
        mutateCreatePost: mutateAsync,
        isPendingCreatePost: isPending,
    }
}

export const useUpdateUser = () => {
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async ([id, form]: [number, FormData]) => {
            return await postService.updatePost(id, form);
        }, onSuccess() {
            toast.success("Cập nhật người dùng thành công.");
            router.back();
        },
    })

    return {
        mutateUpdatePost: mutateAsync,
        isPendingUpdatePost: isPending
    }
}

export const useDeleteUser = () => {

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (id: number) => {
            return await postService.deleltePost(id);
        }, onSuccess() {
            toast.success("Xóa người dùng thành công.");
        },
    })

    return {
        mutateDeletePost: mutateAsync,
        isPendingDeletePost: isPending
    }
}



// ------------------- POST MUTATION ------------------------ //


export const useCreatePost = () => {
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            return await postService.createPost(form);
        }, onSuccess() {
            toast.success("Tạo bài viết thành công.");
            router.back();
        },
    })

    return {
        mutateCreatePost: mutateAsync,
        isPendingCreatePost: isPending,
    }
}

export const useUpdatePost = () => {
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async ([id, form]: [number, FormData]) => {
            return await postService.updatePost(id, form);
        }, onSuccess() {
            toast.success("Cập nhật bài viết thành công.");
            router.back();
        },
    })

    return {
        mutateUpdatePost: mutateAsync,
        isPendingUpdatePost: isPending
    }
}

export const useDeletePost = () => {

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (id: number) => {
            return await postService.deleltePost(id);
        }, onSuccess() {
            toast.success("Xóa bài viết thành công.");
        },
    })

    return {
        mutateDeletePost: mutateAsync,
        isPendingDeletePost: isPending
    }
}

// ------------------- ASSET MUTATION ------------------------ //


export const useCreateAsset = () => {
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            return await assetService.createAsset(form);
        }, onSuccess() {
            toast.success("Tạo căn hộ thành công.");
            router.back();
        },
    })

    return {
        mutateCreateAsset: mutateAsync,
        isPendingCreateAsset: isPending,
    }
}

export const useUpdateAsset = () => {

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async ([id, form]: [number, FormData]) => {
            return await assetService.updateAsset(id, form);
        }, onSuccess() {
            toast.success("Cập nhật căn hộ thành công.");
        },
    })

    return {
        mutateUpdateAsset: mutateAsync,
        isPendingUpdateAsset: isPending
    }
}
