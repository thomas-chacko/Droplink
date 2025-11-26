export interface Theme {
    bgColor: string
    textColor: string
    bgStyle: "light" | "dark" | "gradient"
    buttonStyle: "rounded" | "square" | "outline"
}

export interface Settings {
    isPublic?: boolean
    customDomain?: string
    showPremiumBadge?: boolean
}

export interface User {
    _id: string
    username: string
    name?: string
    theme?: Theme
    email: string
    password: string
    avatar?: string
    coverImage?: string
    bio?: string
    isPremium: boolean
    location?: string
    socialLinks?: { [key: string]: string }
    settings?: boolean
}