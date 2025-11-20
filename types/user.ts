export interface Theme {
    bgColor: string
    textColor: string
}

export interface User {
    _id: string
    username: string
    name?: string  // Make name optional
    theme?: Theme  // Make theme optional
    email: string
    password: string
    avatar?: string  // Make avatar optional
    bio?: string   // Make bio optional
    isPremium: boolean
}