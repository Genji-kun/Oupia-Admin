export interface PostResponse {
    id: number,
    postContent: string,
    assetId?: string,
    fullLocation?: string,
    locationLat?: number,
    locationLong?: number,
    userId: number,
    username: string,
    userAvatar?: string,
    userFullName: string,
    postType: "POST_COMMON" | "POST_FIND" | "POST_RENT",
    tagPrice?: {
        minPrice: number,
        maxPrice: number
    }
    amenities?: any[],
    images: string[],
    isDelete?: boolean,
    createdAt: Date,
}