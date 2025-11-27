import { MetadataRoute } from 'next'
import connectDB from '@/server/db/connection'
import UserModel from '@/server/models/User'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://droplink-web.vercel.app'

    // Static routes
    const routes = [
        '',
        '/login',
        '/signup',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    try {
        await connectDB()
        const users = await UserModel.find({ 'settings.isPublic': true }).select('username updatedAt').lean()

        const userRoutes = users.map((user) => ({
            url: `${baseUrl}/${user.username}`,
            lastModified: (user as any).updatedAt ? new Date((user as any).updatedAt) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }))

        return [...routes, ...userRoutes]
    } catch (error) {
        console.error('Sitemap generation error:', error)
        return routes
    }
}
