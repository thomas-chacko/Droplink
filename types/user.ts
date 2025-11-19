export interface Theme {
    bgColor: string
    textColor: string
}

export interface User {
    _id: string
    username: string
    name: string
    theme: Theme
    email: string
    password: string
    avatar: string
    bio: string
    isPremium: boolean
}