export const authEndpoints = {
    "signIn": `/auth/login/`,
    "currentUser": `/auth/me/`,
    "getAuthToken": `/auth/auth-token/`,
}

export const vnpEndpoints = {
    "provinces": `/provinces/?basic=true&limit=100`,
    "provId": (id: number) => `/provinces/${id}`,
    "distId": (id: number) => `/districts/${id}`
}

export const assetsEndpoints = {
    "createAsset": `/store/landlord/assets/`,
    "getAssets": `/search/assets/`,
    "deleteAsset" : (id: number) => `store/landlord/assets/${id}/`
}

export const postEndpoints = {
    "posts": `/store/posts/`,
    "getPosts": `/search/posts/`,
    "addPost" : `/api/store/admin/posts`,
    "updatePost": (id: number) => `/store/posts/${id}/`,
    "deletePost": (id: number) => `/store/landlord/posts/${id}/`
}

export const userEndpoints = {
    "getUserByUsername": (username: string) => `/store/users/${username}/`,
    "upgrade": `/store/users/upgrade-landlord/`,
    "addUser": `/store/admin/users/`
}


export const followEndpoints = {
    "unFollow": `/store/follows/`,
    "followUser": `/store/follows/`,
    "checkFollow": `/store/follows/`,
    "getFollowersInfo": (id: number) => `/store/follows/${id}/followers/`,
    "getFollowings": (id: number) => `/store/follows/${id}/followings/`,

}

export const favouriteEndpoints = {
    "unFavourite": `/store/favourites/`,
    "saveFavour": `/store/favourites/`,
    "favourCount": (id: number) => `/store/favourites/${id}/`,
    "checkFavourite": `/store/favourites/`,
}

export const searchEndpoints = {
    "users": `/search/admin/users/`,
    "amenities" : `/search/amenities/`
}