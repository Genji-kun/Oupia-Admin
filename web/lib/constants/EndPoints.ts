export const AUTH_ENDPOINTS = {
    SIGN_IN: `auth/login/`,
    CURRENY_USER: `auth/me/`,
}

export const POST_ENDPOINTS = {
    CREATE: `store/admin/posts/`,
    UPDATE: (id: number) => `store/admin/posts/${id}`,
    DELETE: (id: number) => `store/admin/posts/${id}`
}

export const USER_ENDPOINTS = {
    CREATE: `store/admin/users/`,
    UPDATE: (id: number) => `store/admin/users/${id}`,
    DELETE: (id: number) => `store/admin/users/${id}`
}

export const ASSET_ENDPOINTS = {
    CREATE: `store/admin/assets/`,
    UPDATE: (id: number) => `store/admin/assets/${id}`,
    // DELETE: (id: number) => `store/admin/assets/${id}`
}

export const STATISTIC_ENDPOINTS = {
    COUNT_USER: ``,
}