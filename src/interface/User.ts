export interface User{
    username?: string,
    password: string,
    email: string,
    userabout?: About
}

export interface About{
    avatar?: string,
    phone?: number,
    bio?: string,
    location?: string,
    status: string,
    user_id: number
}