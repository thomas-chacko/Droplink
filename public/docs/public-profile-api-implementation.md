# 🎯 Public Profile API Implementation Guide

## **Overview**

This document provides a comprehensive guide for implementing the public profile page API for the Droplink application. The public profile page displays a user's profile information and their active links based on the username in the URL.

---

## **Database Architecture**

### **Current Structure**

The application uses **two separate MongoDB collections**:

1. **Users Collection** (`UserModel`)
   - Stores user profile data
   - Fields: username, name, bio, avatar, theme, settings, etc.
   - Indexed on: `username` (unique), `email` (unique)

2. **Links Collection** (`LinkModel`)
   - Stores user links
   - Fields: userId (ref to User), title, url, icon, order, isActive
   - Indexed on: `userId`, `userId + order`, `userId + isActive`

### **Relationship**

```
Users (1) ←──── (Many) Links
         userId reference
```

---

## **API Implementation**

### **Endpoint Details**

**URL:** `GET /api/public/profile/[username]`

**Authentication:** None (Public endpoint)

**Purpose:** Fetch user profile and active links by username

---

### **Request Example**

```
GET /api/public/profile/johndoe
```

---

### **Response Structure**

#### **Success Response (200)**

```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "user": {
      "username": "johndoe",
      "name": "John Doe",
      "bio": "Designer & Creator | Sharing my journey...",
      "avatar": "https://cloudinary.com/...",
      "coverImage": "https://cloudinary.com/...",
      "isPremium": true,
      "location": "San Francisco, CA",
      "theme": {
        "bgColor": "#2563eb",
        "textColor": "#ffffff",
        "bgStyle": "gradient",
        "buttonStyle": "rounded"
      },
      "socialLinks": {
        "instagram": "https://instagram.com/johndoe",
        "twitter": "https://twitter.com/johndoe"
      }
    },
    "links": [
      {
        "_id": "link123",
        "title": "Portfolio Website",
        "url": "https://johndoe.com",
        "icon": "globe",
        "order": 1,
        "isActive": true,
        "description": "Check out my work"
      },
      {
        "_id": "link456",
        "title": "Instagram",
        "url": "https://instagram.com/johndoe",
        "icon": "instagram",
        "order": 2,
        "isActive": true
      }
    ]
  }
}
```

#### **Error Response (404)**

```json
{
  "success": false,
  "message": "Profile not found"
}
```

#### **Error Response (500)**

```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": "Error details..."
}
```

---

## **Implementation Files**

### **1. API Route**

**File:** `app/api/public/profile/[username]/route.ts`

```typescript
import connectDB from "@/server/db/connection";
import UserModel from "@/server/models/User";
import LinkModel from "@/server/models/Link";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    await connectDB();

    const { username } = await params;

    // Find user by username (case-insensitive)
    const user = await UserModel.findOne(
      { username: username.toLowerCase() },
      { password: 0, email: 0 } // Exclude sensitive data
    ).lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    // Optional: Check if profile is public
    // if (!user.settings?.isPublic) {
    //   return NextResponse.json(
    //     { success: false, message: "Profile not found" },
    //     { status: 404 }
    //   );
    // }

    // Find user's active links, sorted by order
    const links = await LinkModel.find({
      userId: user._id,
      isActive: true,
    })
      .sort({ order: 1 })
      .select("-userId") // Exclude userId from response
      .lean();

    // Return combined data
    return NextResponse.json(
      {
        success: true,
        message: "Profile fetched successfully",
        data: {
          user: {
            username: user.username,
            name: user.name,
            bio: user.bio,
            avatar: user.avatar,
            coverImage: user.coverImage,
            isPremium: user.isPremium,
            location: user.location,
            theme: user.theme,
            socialLinks: user.socialLinks,
          },
          links,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching public profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
```

---

### **2. Update URL Constants**

**File:** `urls/index.ts`

Add the following to the `API_ENDPOINTS` object:

```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints
  PUBLIC: {
    PROFILE: (username: string) => `/api/public/profile/${username}`,
  },
} as const;
```

---

### **3. Update Page Component**

**File:** `app/[username]/page.tsx`

```typescript
import { Instagram, Facebook, Twitter, Youtube, Github, Linkedin } from 'lucide-react';
import { notFound } from 'next/navigation';

const iconMap = {
  globe: () => <span className="text-2xl">🌐</span>,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  linkedin: Linkedin,
};

async function getPublicProfile(username: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/public/profile/${username}`, {
      cache: 'no-store', // or use revalidate for ISR
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profileData = await getPublicProfile(username);

  if (!profileData) {
    notFound(); // Shows 404 page
  }

  const { user, links } = profileData;
  const theme = user.theme || {};

  // Apply theme or use defaults
  const bgClass = theme.bgStyle === 'gradient'
    ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'
    : theme.bgStyle === 'dark'
    ? 'bg-gray-900'
    : 'bg-white';

  const textClass = theme.bgStyle === 'dark' || theme.bgStyle === 'gradient'
    ? 'text-white'
    : 'text-gray-900';

  const subtextClass = theme.bgStyle === 'dark' || theme.bgStyle === 'gradient'
    ? 'text-blue-200'
    : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center p-6`}>
      <div className="w-full max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || user.username}
              className="w-24 h-24 mx-auto rounded-full mb-4 shadow-2xl object-cover"
            />
          ) : (
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-2xl"></div>
          )}
          <h1 className={`text-3xl font-bold ${textClass} mb-2`}>
            {user.name || `@${user.username}`}
          </h1>
          {user.bio && (
            <p className={`${subtextClass} max-w-md mx-auto`}>{user.bio}</p>
          )}
        </div>

        {/* Links */}
        {links.length > 0 ? (
          <div className="space-y-4">
            {links.map((link: any) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap];

              return (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 rounded-2xl font-medium transition transform hover:scale-105 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 shadow-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    {IconComponent && (
                      IconComponent === iconMap.globe ? (
                        IconComponent()
                      ) : (
                        <IconComponent className="w-5 h-5" />
                      )
                    )}
                    <span>{link.title}</span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <p className={`text-center ${subtextClass}`}>No links yet</p>
        )}

        {/* Footer */}
        <div className="text-center mt-12">
          <p className={`text-sm ${subtextClass}`}>
            Create your own Droplink →{' '}
            <a href="/" className="font-semibold hover:underline text-white">
              droplink.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

### **4. Optional: Frontend Service**

**File:** `services/publicProfileServices.ts`

```typescript
import axiosInstance from "@/axios/config";
import { API_ENDPOINTS } from "@/urls";

export interface PublicProfileData {
  user: {
    username: string;
    name?: string;
    bio?: string;
    avatar?: string;
    coverImage?: string;
    isPremium: boolean;
    location?: string;
    theme?: any;
    socialLinks?: { [key: string]: string };
  };
  links: Array<{
    _id: string;
    title: string;
    url: string;
    icon?: string;
    order: number;
    isActive: boolean;
    description?: string;
  }>;
}

export const publicProfileServices = {
  getPublicProfile: async (username: string) => {
    const response = await axiosInstance.get<{
      success: boolean;
      message: string;
      data: PublicProfileData;
    }>(API_ENDPOINTS.PUBLIC.PROFILE(username));
    return response.data;
  },
};
```

---

## **Database Query Strategy**

### **Query Flow**

```typescript
// Step 1: Find user by username (indexed field - fast)
const user = await UserModel.findOne(
  { username: username.toLowerCase() },
  { password: 0, email: 0 }
).lean();

// Step 2: Find user's active links (compound index - fast)
const links = await LinkModel.find({
  userId: user._id,
  isActive: true,
})
  .sort({ order: 1 })
  .lean();

// Step 3: Combine and return
return { user, links };
```

### **Performance Optimization**

Both queries are **highly optimized** because:

1. **Username Query** - Uses unique index on `username` field
2. **Links Query** - Uses compound index on `userId + isActive`
3. **Sorting** - Uses index on `order` field
4. **Lean()** - Returns plain JavaScript objects (faster than Mongoose documents)

---

## **Security Considerations**

### **Data Exclusion**

Always exclude sensitive fields from public responses:

```typescript
// Exclude password and email
{ password: 0, email: 0 }
```

### **Privacy Settings**

Optionally check if profile is public:

```typescript
if (!user.settings?.isPublic) {
  return NextResponse.json(
    { success: false, message: "Profile not found" },
    { status: 404 }
  );
}
```

### **Input Validation**

- Username is converted to lowercase for case-insensitive matching
- MongoDB queries are parameterized (prevents injection)

---

## **Testing Checklist**

- [ ] Test with existing username
- [ ] Test with non-existent username (should return 404)
- [ ] Test with user having no links (should show empty state)
- [ ] Test with user having inactive links (should not display)
- [ ] Test theme customization rendering
- [ ] Test with user having no avatar (should show default)
- [ ] Test case-insensitive username matching (`JohnDoe` vs `johndoe`)
- [ ] Test on mobile devices
- [ ] Test SEO meta tags

---

## **Environment Variables**

Add to `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production:

```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## **File Structure Summary**

```
app/
├── api/
│   └── public/
│       └── profile/
│           └── [username]/
│               └── route.ts          ← NEW
│
├── [username]/
│   └── page.tsx                      ← UPDATE
│
services/
└── publicProfileServices.ts          ← OPTIONAL
│
urls/
└── index.ts                          ← UPDATE
```

---

## **Why This Approach?**

### **Advantages**

1. ✅ **Follows MongoDB Best Practices** - Separate collections with references
2. ✅ **Efficient Queries** - Uses existing indexes
3. ✅ **Single API Call** - Frontend makes one request, gets everything
4. ✅ **No Authentication** - Public endpoint, anyone can access
5. ✅ **Privacy Control** - Can check `settings.isPublic` flag
6. ✅ **Clean Separation** - Users and Links remain independent
7. ✅ **Scalable** - Easy to add more features later

### **Why NOT Embed Links in Users?**

Embedding links directly in the User document would:

- ❌ Hit MongoDB document size limits (16MB)
- ❌ Make individual link updates slower
- ❌ Reduce query flexibility
- ❌ Complicate indexing for link-specific queries
- ❌ Make analytics tracking harder

---

## **Future Enhancements**

1. **Analytics Tracking** - Track link clicks
2. **Custom Domains** - Support custom domain mapping
3. **QR Code Generation** - Generate QR code for profile
4. **Social Share Buttons** - Add share functionality
5. **Profile Views Counter** - Track total profile views
6. **ISR (Incremental Static Regeneration)** - Cache profiles for better performance
7. **SEO Optimization** - Dynamic meta tags, Open Graph, Twitter Cards

---

## **Performance Optimization**

### **Caching Strategy**

Update the fetch call to use ISR:

```typescript
const response = await fetch(`${baseUrl}/api/public/profile/${username}`, {
  next: { revalidate: 60 }, // Revalidate every 60 seconds
});
```

### **Image Optimization**

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src={user.avatar}
  alt={user.name || user.username}
  width={96}
  height={96}
  className="mx-auto rounded-full mb-4 shadow-2xl"
/>
```

---

## **Troubleshooting**

### **Issue: 404 on all profiles**

- Check if `NEXT_PUBLIC_BASE_URL` is set correctly
- Verify MongoDB connection is working
- Check if users exist in database

### **Issue: Links not showing**

- Verify links have `isActive: true`
- Check if `userId` matches user's `_id`
- Verify links are sorted by `order` field

### **Issue: Theme not applying**

- Check if user has `theme` object in database
- Verify theme values are valid
- Check CSS classes are correct

---

## **Support**

For questions or issues, refer to:

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com/docs)

---

**Last Updated:** December 2, 2025
**Version:** 1.0.0
