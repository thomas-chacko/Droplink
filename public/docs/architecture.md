# Droplink - Complete Architecture Guide

## 📋 Project Overview

**Droplink** is a link-in-bio platform that allows users (marketers, influencers, content creators) to consolidate multiple links into a single, shareable profile URL. Users can customize their profile appearance, manage links, and track analytics.

**Current Status:** ✅ Authentication (Login/Signup) completed and integrated

**Tech Stack:**
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **State Management:** Zustand with localStorage persistence
- **Backend:** Next.js API Routes (Serverless)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **HTTP Client:** Axios

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing    │  │  Dashboard   │  │ Public Profile│      │
│  │     Page     │  │     Pages    │  │    /[user]   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│           │                │                  │              │
│           └────────────────┴──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │  Zustand Store  │                        │
│                   │  (Auth, Links)  │                        │
│                   └────────┬────────┘                        │
└────────────────────────────┼──────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Axios Client  │
                    └────────┬────────┘
                             │
┌────────────────────────────┼──────────────────────────────────┐
│                     API LAYER (Next.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │    /auth     │  │   /profile   │  │    /links    │       │
│  │ login/signup │  │  CRUD ops    │  │  CRUD ops    │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         │                 │                  │                │
│  ┌──────┴─────────────────┴──────────────────┴───────┐       │
│  │           Middleware (JWT Verification)            │       │
│  └──────────────────────────┬─────────────────────────┘       │
└─────────────────────────────┼───────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────┐
│                      DATABASE LAYER                            │
│                    ┌────────▼────────┐                         │
│                    │    MongoDB      │                         │
│  ┌─────────────┐   │   Connection    │   ┌─────────────┐      │
│  │    Users    │◄──┤   (Mongoose)    ├──►│    Links    │      │
│  │  Collection │   └─────────────────┘   │  Collection │      │
│  └─────────────┘                         └─────────────┘      │
│  ┌─────────────┐                         ┌─────────────┐      │
│  │  Analytics  │                         │   Themes    │      │
│  │  Collection │                         │  (embedded) │      │
│  └─────────────┘                         └─────────────┘      │
└────────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Design

### Collections & Schema Design


#### 1. Users Collection

```typescript
{
  _id: ObjectId,
  username: string (unique, indexed, 3-30 chars),
  name: string (optional, display name),
  email: string (unique, indexed, lowercase),
  password: string (hashed with bcrypt),
  avatar: string (optional, URL or base64),
  bio: string (optional, max 150 chars),
  isPremium: boolean (default: false),
  theme: {
    bgColor: string (hex color),
    textColor: string (hex color),
    bgStyle: 'light' | 'dark' | 'gradient',
    primaryColor: string (hex color),
    buttonStyle: 'rounded' | 'square' | 'pill'
  },
  socialLinks: {
    instagram: string (optional),
    twitter: string (optional),
    youtube: string (optional),
    tiktok: string (optional),
    linkedin: string (optional)
  },
  settings: {
    isPublic: boolean (default: true),
    showAnalytics: boolean (default: true),
    customDomain: string (optional, premium only)
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `username` (unique)
- `email` (unique)
- `createdAt` (for sorting)

---

#### 2. Links Collection

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, indexed),
  title: string (required, max 100 chars),
  url: string (required, valid URL),
  description: string (optional, max 200 chars),
  icon: string (optional, emoji or icon name),
  thumbnail: string (optional, image URL),
  isActive: boolean (default: true),
  order: number (for drag-and-drop sorting),
  clicks: number (default: 0),
  style: {
    backgroundColor: string (optional),
    textColor: string (optional),
    borderColor: string (optional)
  },
  schedule: {
    startDate: Date (optional),
    endDate: Date (optional)
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` (for querying user's links)
- `userId + order` (compound index for sorted queries)
- `userId + isActive` (for active links only)

---

#### 3. Analytics Collection

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users, indexed),
  linkId: ObjectId (ref: Links, indexed, optional),
  eventType: 'profile_view' | 'link_click',
  
  // Visitor Information
  visitorId: string (anonymous hash for unique tracking),
  ipAddress: string (hashed for privacy),
  
  // Device & Browser
  device: 'mobile' | 'desktop' | 'tablet',
  browser: string,
  os: string,
  
  // Location (from IP geolocation)
  country: string,
  city: string,
  region: string,
  
  // Referrer Information
  referrer: string (where they came from),
  referrerDomain: string,
  
  // UTM Parameters (for marketing tracking)
  utmSource: string (optional),
  utmMedium: string (optional),
  utmCampaign: string (optional),
  
  timestamp: Date (indexed),
  createdAt: Date
}
```

**Indexes:**
- `userId + timestamp` (compound, for time-range queries)
- `linkId + timestamp` (compound, for link-specific analytics)
- `userId + eventType + timestamp` (compound, for filtered queries)
- `timestamp` (TTL index, optional - auto-delete old data after 90 days for free users)

---


## 🎨 Frontend Architecture

### Page Structure

```
app/
├── page.tsx                    # Landing page (marketing)
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles
│
├── login/
│   └── page.tsx               # ✅ Login page (COMPLETED)
│
├── signup/
│   └── page.tsx               # ✅ Signup page (COMPLETED)
│
├── dashboard/                  # Protected routes
│   ├── layout.tsx             # Dashboard layout with sidebar
│   ├── page.tsx               # Overview/Dashboard home
│   │
│   ├── profile/
│   │   └── page.tsx           # Profile management
│   │
│   ├── links/
│   │   └── page.tsx           # Link management (CRUD)
│   │
│   ├── theme/
│   │   └── page.tsx           # Theme customization
│   │
│   ├── analytics/
│   │   └── page.tsx           # Analytics dashboard
│   │
│   └── settings/
│       └── page.tsx           # Account settings
│
├── [username]/
│   └── page.tsx               # Public profile view
│
└── api/                        # API Routes
    ├── auth/
    │   ├── login/
    │   │   └── route.ts       # ✅ POST /api/auth/login (COMPLETED)
    │   └── signup/
    │       └── route.ts       # ✅ POST /api/auth/signup (COMPLETED)
    │
    ├── profile/
    │   ├── route.ts           # GET, PUT /api/profile
    │   └── avatar/
    │       └── route.ts       # POST /api/profile/avatar
    │
    ├── links/
    │   ├── route.ts           # GET, POST /api/links
    │   └── [id]/
    │       └── route.ts       # GET, PUT, DELETE /api/links/:id
    │
    ├── theme/
    │   └── route.ts           # GET, PUT /api/theme
    │
    ├── analytics/
    │   ├── overview/
    │   │   └── route.ts       # GET /api/analytics/overview
    │   ├── links/
    │   │   └── route.ts       # GET /api/analytics/links
    │   └── track/
    │       └── route.ts       # POST /api/analytics/track
    │
    └── public/
        └── [username]/
            └── route.ts       # GET /api/public/:username
```

### Component Structure

```
components/
├── AuthRedirect.tsx           # ✅ Redirect logic (COMPLETED)
├── ProtectedRoute.tsx         # ✅ Auth guard (COMPLETED)
├── Header.tsx                 # Landing page header
├── Footer.tsx                 # Landing page footer
├── HeroSection.tsx            # Landing sections
├── FeaturesSection.tsx
├── TestimonialsSection.tsx
├── HowItWorksSection.tsx
├── PricingSection.tsx
│
├── dashboard/                 # Dashboard-specific components
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── StatsCard.tsx         # Metric display cards
│   ├── LinkCard.tsx          # Individual link item
│   ├── LinkForm.tsx          # Add/Edit link form
│   ├── ThemePreview.tsx      # Live theme preview
│   ├── AnalyticsChart.tsx    # Chart components
│   └── DeviceBreakdown.tsx   # Device analytics
│
└── profile/                   # Public profile components
    ├── ProfileHeader.tsx     # Avatar, name, bio
    ├── LinkButton.tsx        # Styled link button
    └── SocialIcons.tsx       # Social media icons
```

### State Management (Zustand)

```typescript
// store/useAuthStore.ts - ✅ COMPLETED
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (token: string, user: User) => void
  clearAuth: () => void
  updateUser: (user: Partial<User>) => void
}

// store/useLinksStore.ts - TO BE CREATED
interface LinksState {
  links: Link[]
  isLoading: boolean
  error: string | null
  fetchLinks: () => Promise<void>
  addLink: (link: Omit<Link, '_id'>) => Promise<void>
  updateLink: (id: string, data: Partial<Link>) => Promise<void>
  deleteLink: (id: string) => Promise<void>
  reorderLinks: (links: Link[]) => Promise<void>
}

// store/useThemeStore.ts - TO BE CREATED
interface ThemeState {
  theme: Theme | null
  isLoading: boolean
  fetchTheme: () => Promise<void>
  updateTheme: (theme: Partial<Theme>) => Promise<void>
}

// store/useAnalyticsStore.ts - TO BE CREATED
interface AnalyticsState {
  overview: AnalyticsOverview | null
  linkStats: LinkAnalytics[]
  timeRange: '24h' | '7d' | '30d' | '90d'
  isLoading: boolean
  setTimeRange: (range: string) => void
  fetchOverview: () => Promise<void>
  fetchLinkStats: () => Promise<void>
}
```

---


## 🔌 API Design

### Authentication APIs (✅ COMPLETED)

#### POST /api/auth/signup
```typescript
Request:
{
  username: string,
  email: string,
  password: string
}

Response (201):
{
  success: true,
  message: "User created successfully",
  token: string,
  user: {
    id: string,
    username: string,
    email: string,
    isPremium: boolean
  }
}

Errors:
- 400: Validation errors
- 409: Username/email already exists
- 500: Server error
```

#### POST /api/auth/login
```typescript
Request:
{
  email: string,
  password: string
}

Response (200):
{
  success: true,
  message: "Login successful",
  token: string,
  user: {
    id: string,
    username: string,
    email: string,
    isPremium: boolean
  }
}

Errors:
- 400: Invalid credentials
- 404: User not found
- 500: Server error
```

---

### Profile APIs (TO BE IMPLEMENTED)

#### GET /api/profile
**Description:** Get current user's profile
**Auth:** Required (JWT)

```typescript
Response (200):
{
  success: true,
  profile: {
    username: string,
    name: string,
    email: string,
    avatar: string,
    bio: string,
    isPremium: boolean,
    socialLinks: {
      instagram?: string,
      twitter?: string,
      youtube?: string,
      tiktok?: string,
      linkedin?: string
    },
    settings: {
      isPublic: boolean,
      showAnalytics: boolean,
      customDomain?: string
    },
    createdAt: Date
  }
}
```

#### PUT /api/profile
**Description:** Update user profile
**Auth:** Required (JWT)

```typescript
Request:
{
  name?: string,
  bio?: string,
  avatar?: string,
  socialLinks?: {
    instagram?: string,
    twitter?: string,
    youtube?: string,
    tiktok?: string,
    linkedin?: string
  }
}

Response (200):
{
  success: true,
  message: "Profile updated successfully",
  profile: { /* updated profile */ }
}

Errors:
- 400: Validation error
- 401: Unauthorized
- 500: Server error
```

#### POST /api/profile/avatar
**Description:** Upload profile avatar
**Auth:** Required (JWT)
**Content-Type:** multipart/form-data

```typescript
Request:
FormData {
  avatar: File (image, max 5MB)
}

Response (200):
{
  success: true,
  avatarUrl: string
}

Implementation Notes:
- Use Next.js built-in file handling or upload to cloud storage (Cloudinary, AWS S3)
- Validate file type (jpg, png, webp)
- Resize/optimize image (max 500x500px)
```

---

### Links APIs (TO BE IMPLEMENTED)

#### GET /api/links
**Description:** Get all links for authenticated user
**Auth:** Required (JWT)

```typescript
Query Parameters:
- isActive?: boolean (filter by active status)
- sort?: 'order' | 'createdAt' | 'clicks' (default: 'order')

Response (200):
{
  success: true,
  links: [
    {
      _id: string,
      title: string,
      url: string,
      description: string,
      icon: string,
      thumbnail: string,
      isActive: boolean,
      order: number,
      clicks: number,
      style: {
        backgroundColor: string,
        textColor: string,
        borderColor: string
      },
      createdAt: Date,
      updatedAt: Date
    }
  ],
  total: number
}
```

#### POST /api/links
**Description:** Create a new link
**Auth:** Required (JWT)

```typescript
Request:
{
  title: string (required, max 100 chars),
  url: string (required, valid URL),
  description?: string (max 200 chars),
  icon?: string,
  thumbnail?: string,
  isActive?: boolean (default: true),
  style?: {
    backgroundColor?: string,
    textColor?: string,
    borderColor?: string
  }
}

Response (201):
{
  success: true,
  message: "Link created successfully",
  link: { /* created link */ }
}

Business Logic:
- Auto-assign order (max order + 1)
- Validate URL format
- Free users: max 10 links
- Premium users: unlimited links
```

#### PUT /api/links/[id]
**Description:** Update a specific link
**Auth:** Required (JWT)

```typescript
Request:
{
  title?: string,
  url?: string,
  description?: string,
  icon?: string,
  thumbnail?: string,
  isActive?: boolean,
  style?: {
    backgroundColor?: string,
    textColor?: string,
    borderColor?: string
  }
}

Response (200):
{
  success: true,
  message: "Link updated successfully",
  link: { /* updated link */ }
}

Errors:
- 404: Link not found
- 403: Not authorized (link belongs to another user)
```

#### DELETE /api/links/[id]
**Description:** Delete a specific link
**Auth:** Required (JWT)

```typescript
Response (200):
{
  success: true,
  message: "Link deleted successfully"
}

Business Logic:
- Soft delete or hard delete (your choice)
- Reorder remaining links
```

#### PUT /api/links/reorder
**Description:** Reorder links (drag-and-drop)
**Auth:** Required (JWT)

```typescript
Request:
{
  linkIds: string[] (array of link IDs in new order)
}

Response (200):
{
  success: true,
  message: "Links reordered successfully"
}

Business Logic:
- Update order field for each link
- Validate all links belong to user
```

---


### Theme APIs (TO BE IMPLEMENTED)

#### GET /api/theme
**Description:** Get user's theme settings
**Auth:** Required (JWT)

```typescript
Response (200):
{
  success: true,
  theme: {
    bgColor: string,
    textColor: string,
    bgStyle: 'light' | 'dark' | 'gradient',
    primaryColor: string,
    buttonStyle: 'rounded' | 'square' | 'pill'
  }
}
```

#### PUT /api/theme
**Description:** Update theme settings
**Auth:** Required (JWT)

```typescript
Request:
{
  bgColor?: string,
  textColor?: string,
  bgStyle?: 'light' | 'dark' | 'gradient',
  primaryColor?: string,
  buttonStyle?: 'rounded' | 'square' | 'pill'
}

Response (200):
{
  success: true,
  message: "Theme updated successfully",
  theme: { /* updated theme */ }
}

Business Logic:
- Premium feature check
- Validate color hex codes
- Provide default theme for free users
```

---

### Analytics APIs (TO BE IMPLEMENTED)

#### GET /api/analytics/overview
**Description:** Get analytics overview
**Auth:** Required (JWT)

```typescript
Query Parameters:
- timeRange: '24h' | '7d' | '30d' | '90d' (default: '7d')

Response (200):
{
  success: true,
  analytics: {
    profileViews: {
      total: number,
      change: number (percentage)
    },
    linkClicks: {
      total: number,
      change: number
    },
    uniqueVisitors: {
      total: number,
      change: number
    },
    avgTimeOnPage: string,
    clickThroughRate: number,
    
    // Time series data for charts
    dailyStats: [
      {
        date: string,
        views: number,
        clicks: number,
        visitors: number
      }
    ],
    
    // Device breakdown
    deviceStats: {
      mobile: number,
      desktop: number,
      tablet: number
    },
    
    // Top locations
    topLocations: [
      {
        country: string,
        visitors: number,
        percentage: number
      }
    ],
    
    // Top referrers
    topReferrers: [
      {
        source: string,
        visits: number,
        percentage: number
      }
    ]
  }
}
```

#### GET /api/analytics/links
**Description:** Get per-link analytics
**Auth:** Required (JWT)

```typescript
Query Parameters:
- timeRange: '24h' | '7d' | '30d' | '90d'
- linkId?: string (optional, for specific link)

Response (200):
{
  success: true,
  linkAnalytics: [
    {
      linkId: string,
      title: string,
      url: string,
      clicks: number,
      uniqueClicks: number,
      clickThroughRate: number,
      change: number,
      dailyClicks: [
        {
          date: string,
          clicks: number
        }
      ]
    }
  ]
}
```

#### POST /api/analytics/track
**Description:** Track analytics event (profile view or link click)
**Auth:** Not required (public endpoint)

```typescript
Request:
{
  username: string,
  eventType: 'profile_view' | 'link_click',
  linkId?: string (required if eventType is 'link_click'),
  
  // Client-side data
  referrer?: string,
  utmSource?: string,
  utmMedium?: string,
  utmCampaign?: string
}

Response (200):
{
  success: true,
  message: "Event tracked"
}

Business Logic:
- Extract device info from User-Agent
- Get IP address from request headers
- Use IP geolocation service (ip-api.com, ipinfo.io)
- Generate anonymous visitorId (hash of IP + User-Agent)
- Rate limiting to prevent spam
```

---

### Public APIs (TO BE IMPLEMENTED)

#### GET /api/public/[username]
**Description:** Get public profile data
**Auth:** Not required

```typescript
Response (200):
{
  success: true,
  profile: {
    username: string,
    name: string,
    avatar: string,
    bio: string,
    theme: {
      bgColor: string,
      textColor: string,
      bgStyle: string,
      primaryColor: string,
      buttonStyle: string
    },
    socialLinks: {
      instagram?: string,
      twitter?: string,
      youtube?: string,
      tiktok?: string,
      linkedin?: string
    },
    links: [
      {
        _id: string,
        title: string,
        url: string,
        description: string,
        icon: string,
        thumbnail: string,
        order: number,
        style: {
          backgroundColor: string,
          textColor: string,
          borderColor: string
        }
      }
    ]
  }
}

Errors:
- 404: User not found or profile is private

Business Logic:
- Only return active links
- Sort by order field
- Don't expose sensitive data (email, password, etc.)
- Track profile view event
```

---


## 🔐 Security & Middleware

### JWT Authentication Middleware

```typescript
// lib/middleware/auth.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function verifyAuth(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded; // { userId, email, username }
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Usage in API routes:
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    // ... handle request
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
}
```

### Rate Limiting

```typescript
// lib/middleware/rateLimit.ts
import { NextRequest } from 'next/server';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
  request: NextRequest,
  limit: number = 100,
  windowMs: number = 60000
) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}
```

### Input Validation

```typescript
// lib/validation.ts - EXTEND EXISTING
import { z } from 'zod'; // Consider adding Zod for validation

export const linkSchema = z.object({
  title: z.string().min(1).max(100),
  url: z.string().url(),
  description: z.string().max(200).optional(),
  icon: z.string().optional(),
  thumbnail: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  bio: z.string().max(150).optional(),
  avatar: z.string().url().optional(),
  socialLinks: z.object({
    instagram: z.string().url().optional(),
    twitter: z.string().url().optional(),
    youtube: z.string().url().optional(),
    tiktok: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }).optional(),
});

export const themeSchema = z.object({
  bgColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  textColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  bgStyle: z.enum(['light', 'dark', 'gradient']).optional(),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  buttonStyle: z.enum(['rounded', 'square', 'pill']).optional(),
});
```

### CORS Configuration

```typescript
// next.config.ts - UPDATE
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};
```

---


## 📱 Feature Implementation Plan

### Phase 1: Profile Management (PRIORITY 1)

#### Frontend Tasks:
1. **Profile Page (`/dashboard/profile`)**
   - ✅ Basic UI already exists
   - Add form validation
   - Implement avatar upload (file input + preview)
   - Add social links input fields
   - Connect to API endpoints
   - Add loading states and error handling
   - Success notifications

2. **Profile Preview**
   - Create preview modal/page
   - Fetch data from public API
   - Implement responsive design
   - Add share functionality

#### Backend Tasks:
1. **Create Profile Model Updates**
   - Extend User schema with socialLinks
   - Add settings field

2. **Implement Profile APIs**
   - `GET /api/profile` - Fetch user profile
   - `PUT /api/profile` - Update profile
   - `POST /api/profile/avatar` - Upload avatar
   - Add JWT middleware
   - Validate inputs

3. **Public Profile API**
   - `GET /api/public/[username]` - Public profile data
   - Filter sensitive information
   - Return only active links

#### Testing:
- Test profile update flow
- Test avatar upload (size limits, formats)
- Test public profile visibility
- Test validation errors

---

### Phase 2: Link Management (PRIORITY 1)

#### Frontend Tasks:
1. **Links Page (`/dashboard/links`)**
   - ✅ Basic UI already exists
   - Implement drag-and-drop reordering (react-beautiful-dnd or dnd-kit)
   - Add edit modal/form
   - Add delete confirmation
   - Connect to API endpoints
   - Real-time link count display
   - Premium limit enforcement (10 links for free users)

2. **Link Form Component**
   - Title, URL, description inputs
   - Icon picker (emoji or icon library)
   - Thumbnail upload
   - Custom styling options (colors)
   - URL validation
   - Preview before save

#### Backend Tasks:
1. **Create Links Model**
   - Define schema (see database design)
   - Add indexes

2. **Implement Links APIs**
   - `GET /api/links` - Fetch user's links
   - `POST /api/links` - Create link
   - `PUT /api/links/[id]` - Update link
   - `DELETE /api/links/[id]` - Delete link
   - `PUT /api/links/reorder` - Reorder links
   - Add JWT middleware
   - Validate inputs
   - Enforce link limits (free vs premium)

#### Testing:
- Test CRUD operations
- Test drag-and-drop reordering
- Test link limits
- Test URL validation
- Test concurrent updates

---

### Phase 3: Theme Customization (PRIORITY 2)

#### Frontend Tasks:
1. **Theme Page (`/dashboard/theme`)**
   - ✅ Basic UI already exists
   - ✅ Live preview already implemented
   - Connect to API endpoints
   - Add more color presets
   - Add button style options
   - Add font options (optional)
   - Premium feature gating

2. **Public Profile Theming**
   - Apply theme to `[username]/page.tsx`
   - Dynamic styling based on theme
   - Fallback to default theme

#### Backend Tasks:
1. **Implement Theme APIs**
   - `GET /api/theme` - Fetch user's theme
   - `PUT /api/theme` - Update theme
   - Add JWT middleware
   - Validate color codes
   - Premium feature check

2. **Update User Model**
   - Extend theme schema with new fields

#### Testing:
- Test theme updates
- Test live preview
- Test premium restrictions
- Test theme application on public profile

---

### Phase 4: Analytics (PRIORITY 2)

#### Frontend Tasks:
1. **Analytics Page (`/dashboard/analytics`)**
   - ✅ Basic UI already exists
   - Connect to real API data
   - Implement time range filtering
   - Add chart library (recharts or chart.js)
   - Display metrics:
     - Profile views
     - Link clicks
     - Unique visitors
     - Device breakdown
     - Geographic data
     - Top referrers
   - Export data (CSV) - premium feature

2. **Dashboard Overview**
   - ✅ Stats cards already exist
   - Connect to real analytics data
   - Show recent activity

#### Backend Tasks:
1. **Create Analytics Model**
   - Define schema (see database design)
   - Add indexes for performance

2. **Implement Analytics APIs**
   - `GET /api/analytics/overview` - Overview stats
   - `GET /api/analytics/links` - Per-link stats
   - `POST /api/analytics/track` - Track events
   - Implement aggregation queries
   - Add caching for performance

3. **Analytics Tracking**
   - Track profile views on public profile
   - Track link clicks
   - Extract device info from User-Agent
   - Implement IP geolocation
   - Generate anonymous visitor IDs

4. **Background Jobs (Optional)**
   - Pre-aggregate daily stats
   - Clean up old analytics data

#### Testing:
- Test event tracking
- Test analytics queries with large datasets
- Test time range filtering
- Test data accuracy

---


### Phase 5: Public Profile Page (PRIORITY 1)

#### Frontend Tasks:
1. **Public Profile (`/[username]/page.tsx`)**
   - Fetch profile data from API
   - Display user info (avatar, name, bio)
   - Render links with custom styling
   - Apply user's theme
   - Add social media icons
   - Implement link click tracking
   - Add meta tags for SEO
   - Add Open Graph tags for social sharing
   - Responsive design
   - Loading states
   - 404 page for non-existent users

2. **Link Click Handling**
   - Track click before redirect
   - Increment click count
   - Send analytics event

#### Backend Tasks:
1. **Public Profile API**
   - `GET /api/public/[username]` - Already planned above
   - Optimize query performance
   - Cache profile data (optional)

2. **Link Click Tracking**
   - Update link clicks count
   - Create analytics event

#### Testing:
- Test profile loading
- Test theme application
- Test link clicks and tracking
- Test SEO meta tags
- Test social sharing preview

---

### Phase 6: Settings & Account Management (PRIORITY 3)

#### Frontend Tasks:
1. **Settings Page (`/dashboard/settings`)**
   - Account settings
     - Change email
     - Change password
     - Delete account
   - Privacy settings
     - Make profile public/private
     - Show/hide analytics
   - Subscription management
     - Upgrade to premium
     - Cancel subscription
     - Billing history

#### Backend Tasks:
1. **Implement Settings APIs**
   - `PUT /api/settings/email` - Change email
   - `PUT /api/settings/password` - Change password
   - `DELETE /api/settings/account` - Delete account
   - `PUT /api/settings/privacy` - Update privacy settings

2. **Payment Integration (Optional)**
   - Integrate Stripe or PayPal
   - Create subscription plans
   - Handle webhooks
   - Update isPremium status

#### Testing:
- Test email change
- Test password change
- Test account deletion
- Test privacy settings

---


## 🚀 Implementation Roadmap

### Week 1-2: Profile & Links Foundation
**Goal:** Users can manage their profile and links

**Tasks:**
1. ✅ Authentication (COMPLETED)
2. Create Links model and APIs
3. Implement link CRUD operations
4. Update Profile APIs
5. Connect frontend to backend
6. Test all CRUD operations

**Deliverables:**
- Users can add/edit/delete links
- Users can update their profile
- Basic profile preview works

---

### Week 3: Public Profile & Theme
**Goal:** Users can share their profile and customize appearance

**Tasks:**
1. Implement public profile page
2. Create Theme APIs
3. Connect theme customization
4. Apply themes to public profile
5. Add SEO meta tags
6. Test sharing functionality

**Deliverables:**
- Public profile is accessible via /[username]
- Users can customize theme (premium)
- Profile is shareable on social media

---

### Week 4: Analytics Foundation
**Goal:** Basic analytics tracking

**Tasks:**
1. Create Analytics model
2. Implement tracking API
3. Track profile views
4. Track link clicks
5. Basic analytics dashboard
6. Device and location tracking

**Deliverables:**
- Profile views are tracked
- Link clicks are tracked
- Basic analytics dashboard shows data

---

### Week 5: Analytics Dashboard
**Goal:** Comprehensive analytics insights

**Tasks:**
1. Implement analytics aggregation
2. Create analytics overview API
3. Build charts and visualizations
4. Add time range filtering
5. Show top performing links
6. Geographic and referrer data

**Deliverables:**
- Full analytics dashboard
- Charts and graphs
- Exportable data (premium)

---

### Week 6: Polish & Optimization
**Goal:** Production-ready application

**Tasks:**
1. Performance optimization
2. Error handling improvements
3. Loading states
4. Responsive design fixes
5. Security audit
6. Testing and bug fixes
7. Documentation

**Deliverables:**
- Stable, production-ready app
- Good user experience
- Comprehensive documentation

---


## 🛠️ Technical Implementation Details

### File Upload Strategy

**Option 1: Base64 Encoding (Simple)**
```typescript
// Store images as base64 strings in MongoDB
// Pros: Simple, no external dependencies
// Cons: Large database size, slower queries
// Best for: MVP, small images, low traffic

const handleAvatarUpload = async (file: File) => {
  const base64 = await fileToBase64(file);
  await updateProfile({ avatar: base64 });
};
```

**Option 2: Cloud Storage (Recommended)**
```typescript
// Use Cloudinary, AWS S3, or Vercel Blob
// Pros: Fast, scalable, CDN delivery
// Cons: Additional service, costs
// Best for: Production, high traffic

// Example with Cloudinary:
import { v2 as cloudinary } from 'cloudinary';

const uploadAvatar = async (file: File) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: 'droplink/avatars',
    transformation: [
      { width: 500, height: 500, crop: 'fill' },
      { quality: 'auto' }
    ]
  });
  return result.secure_url;
};
```

---

### Analytics Implementation

**IP Geolocation:**
```typescript
// Use free IP geolocation API
import axios from 'axios';

async function getLocationFromIP(ip: string) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return {
      country: response.data.country,
      city: response.data.city,
      region: response.data.regionName
    };
  } catch (error) {
    return { country: 'Unknown', city: 'Unknown', region: 'Unknown' };
  }
}
```

**Device Detection:**
```typescript
import { UAParser } from 'ua-parser-js';

function getDeviceInfo(userAgent: string) {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  
  return {
    device: result.device.type || 'desktop',
    browser: result.browser.name,
    os: result.os.name
  };
}
```

**Visitor ID Generation:**
```typescript
import crypto from 'crypto';

function generateVisitorId(ip: string, userAgent: string): string {
  const hash = crypto
    .createHash('sha256')
    .update(ip + userAgent)
    .digest('hex');
  return hash.substring(0, 16);
}
```

---

### Link Click Tracking

**Client-side Implementation:**
```typescript
// components/profile/LinkButton.tsx
const handleLinkClick = async (linkId: string, url: string) => {
  // Track click (non-blocking)
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: profileUsername,
      eventType: 'link_click',
      linkId,
      referrer: document.referrer,
      utmSource: new URLSearchParams(window.location.search).get('utm_source'),
      utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
      utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign')
    })
  }).catch(() => {}); // Ignore errors
  
  // Redirect after short delay
  setTimeout(() => {
    window.open(url, '_blank');
  }, 100);
};
```

---

### Drag-and-Drop Link Reordering

**Using dnd-kit (Recommended):**
```typescript
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = links.findIndex(l => l._id === active.id);
      const newIndex = links.findIndex(l => l._id === over?.id);
      
      const newLinks = arrayMove(links, oldIndex, newIndex);
      setLinks(newLinks);
      
      // Update backend
      await axios.put('/api/links/reorder', {
        linkIds: newLinks.map(l => l._id)
      });
    }
  };
  
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={links} strategy={verticalListSortingStrategy}>
        {links.map(link => (
          <SortableLinkItem key={link._id} link={link} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
```

---

### Caching Strategy

**API Response Caching:**
```typescript
// lib/cache.ts
const cache = new Map<string, { data: any; expiry: number }>();

export function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

export function setCache(key: string, data: any, ttlMs: number = 60000) {
  cache.set(key, {
    data,
    expiry: Date.now() + ttlMs
  });
}

// Usage in API route:
export async function GET(request: NextRequest) {
  const cacheKey = `profile:${username}`;
  const cached = getCached(cacheKey);
  
  if (cached) {
    return NextResponse.json(cached);
  }
  
  const profile = await fetchProfileFromDB(username);
  setCache(cacheKey, profile, 300000); // 5 minutes
  
  return NextResponse.json(profile);
}
```

---

### Database Optimization

**Indexes:**
```typescript
// server/models/Link.ts
LinkSchema.index({ userId: 1, order: 1 });
LinkSchema.index({ userId: 1, isActive: 1 });

// server/models/Analytics.ts
AnalyticsSchema.index({ userId: 1, timestamp: -1 });
AnalyticsSchema.index({ linkId: 1, timestamp: -1 });
AnalyticsSchema.index({ userId: 1, eventType: 1, timestamp: -1 });
```

**Aggregation Pipeline for Analytics:**
```typescript
// Get overview stats
const stats = await Analytics.aggregate([
  {
    $match: {
      userId: new ObjectId(userId),
      timestamp: { $gte: startDate, $lte: endDate }
    }
  },
  {
    $group: {
      _id: '$eventType',
      count: { $sum: 1 },
      uniqueVisitors: { $addToSet: '$visitorId' }
    }
  }
]);
```

---


## 📦 Required Dependencies

### Add to package.json:

```json
{
  "dependencies": {
    // Existing dependencies...
    
    // Drag and Drop
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    
    // Charts (choose one)
    "recharts": "^2.10.0",
    // OR
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    
    // Form Validation
    "zod": "^3.22.4",
    
    // User Agent Parsing
    "ua-parser-js": "^1.0.37",
    
    // Image Upload (if using Cloudinary)
    "cloudinary": "^2.0.0",
    
    // Date Formatting
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    // Existing dev dependencies...
    "@types/ua-parser-js": "^0.7.39"
  }
}
```

---

## 🎯 Key Features Summary

### Free Plan Features:
- ✅ Unlimited profile views
- ✅ Up to 10 links
- ✅ Basic analytics (7 days)
- ✅ Default themes
- ✅ Social media icons
- ✅ Custom username

### Premium Plan Features ($9.99/month):
- ✅ Unlimited links
- ✅ Advanced analytics (90 days)
- ✅ Custom themes & colors
- ✅ Remove Droplink branding
- ✅ Custom domain (optional)
- ✅ Priority support
- ✅ Export analytics data
- ✅ Link scheduling
- ✅ Custom link thumbnails

---

## 🔄 Data Flow Examples

### User Creates a Link:
```
1. User fills form in /dashboard/links
2. Frontend validates input (Zod)
3. POST /api/links with JWT token
4. Backend verifies JWT
5. Backend validates data
6. Backend checks link limit (free vs premium)
7. Backend creates link in MongoDB
8. Backend returns created link
9. Frontend updates Zustand store
10. Frontend shows success message
11. UI updates with new link
```

### Visitor Views Public Profile:
```
1. Visitor navigates to /[username]
2. Frontend fetches GET /api/public/[username]
3. Backend queries User and Links collections
4. Backend returns profile data
5. Frontend renders profile with theme
6. Frontend sends POST /api/analytics/track (profile_view)
7. Backend extracts IP, User-Agent
8. Backend gets geolocation from IP
9. Backend creates analytics record
10. Backend increments profile view count
```

### User Views Analytics:
```
1. User navigates to /dashboard/analytics
2. User selects time range (7d)
3. Frontend fetches GET /api/analytics/overview?timeRange=7d
4. Backend verifies JWT
5. Backend runs aggregation queries on Analytics collection
6. Backend calculates metrics (views, clicks, CTR, etc.)
7. Backend returns aggregated data
8. Frontend renders charts and stats
9. User can filter by date range
10. Frontend refetches with new parameters
```

---


## 🎨 UI/UX Considerations

### Design System
- **Colors:** Dark theme with blue/purple accents (already implemented)
- **Typography:** Geist Sans (already configured)
- **Spacing:** Consistent padding/margins using Tailwind
- **Animations:** Smooth transitions, hover effects
- **Responsive:** Mobile-first approach

### User Experience Flow

**New User Journey:**
```
1. Land on homepage → See features
2. Click "Get Started" → Signup page
3. Create account → Auto-login
4. Redirect to dashboard → Welcome message
5. Add first link → Guided tutorial (optional)
6. Customize profile → Preview profile
7. Share profile URL → Track analytics
```

**Returning User Journey:**
```
1. Login → Dashboard
2. View analytics overview
3. Manage links (add/edit/delete)
4. Customize theme
5. Share profile
```

### Accessibility
- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Color contrast compliance (WCAG AA)

### Performance Optimization
- Image optimization (Next.js Image component)
- Lazy loading for analytics charts
- Code splitting
- API response caching
- Database query optimization
- CDN for static assets

---

## 🧪 Testing Strategy

### Unit Tests
- Validation functions
- Utility functions
- API route handlers
- Database models

### Integration Tests
- API endpoints
- Authentication flow
- CRUD operations
- Analytics tracking

### E2E Tests (Optional)
- User signup/login
- Link management
- Profile customization
- Public profile viewing

### Testing Tools
- Jest for unit tests
- React Testing Library for component tests
- Playwright or Cypress for E2E tests

---

## 🚨 Error Handling

### Frontend Error Handling
```typescript
// services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
    }
    
    // Show user-friendly error message
    const message = error.response?.data?.message || 'Something went wrong';
    toast.error(message); // Using a toast library
    
    return Promise.reject(error);
  }
);
```

### Backend Error Handling
```typescript
// lib/errors.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
  }
}

// Usage in API routes:
export async function POST(request: NextRequest) {
  try {
    // ... handle request
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.statusCode }
      );
    }
    
    // Log unexpected errors
    console.error('Unexpected error:', error);
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 📊 Monitoring & Logging

### Logging Strategy
```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
  },
  warn: (message: string, meta?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta);
  }
};

// Usage:
logger.info('User logged in', { userId: user.id });
logger.error('Failed to create link', error);
```

### Monitoring Tools (Optional)
- **Vercel Analytics** - Built-in for Next.js on Vercel
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Google Analytics** - User behavior

---


## 🔐 Environment Variables

### Required Environment Variables

```bash
# .env.local

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/droplink

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# API
NEXT_PUBLIC_API_URL=http://localhost:3333

# File Upload (if using Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Payment (if implementing Stripe)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email (if implementing email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Analytics (optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# IP Geolocation (optional, if using paid service)
IPINFO_TOKEN=your-token
```

---

## 📝 API Documentation Template

### Example API Documentation

```markdown
## POST /api/links

Create a new link for the authenticated user.

### Authentication
Required: Yes (JWT Bearer token)

### Request Body
```json
{
  "title": "My Portfolio",
  "url": "https://example.com",
  "description": "Check out my work",
  "icon": "🎨",
  "isActive": true
}
```

### Response (201 Created)
```json
{
  "success": true,
  "message": "Link created successfully",
  "link": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f191e810c19729de860ea",
    "title": "My Portfolio",
    "url": "https://example.com",
    "description": "Check out my work",
    "icon": "🎨",
    "isActive": true,
    "order": 1,
    "clicks": 0,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Error Responses

**400 Bad Request**
```json
{
  "success": false,
  "message": "Invalid URL format"
}
```

**401 Unauthorized**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**403 Forbidden**
```json
{
  "success": false,
  "message": "Link limit reached. Upgrade to premium for unlimited links."
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Internal server error"
}
```
```

---

## 🎯 Next Steps - Quick Start Guide

### Immediate Actions (Start Here):

1. **Create Database Models**
   ```bash
   # Create these files:
   server/models/Link.ts
   server/models/Analytics.ts
   ```

2. **Create API Routes**
   ```bash
   # Create these directories and files:
   app/api/profile/route.ts
   app/api/links/route.ts
   app/api/links/[id]/route.ts
   app/api/theme/route.ts
   app/api/analytics/overview/route.ts
   app/api/analytics/track/route.ts
   app/api/public/[username]/route.ts
   ```

3. **Create Zustand Stores**
   ```bash
   # Create these files:
   store/useLinksStore.ts
   store/useThemeStore.ts
   store/useAnalyticsStore.ts
   ```

4. **Install Dependencies**
   ```bash
   npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
   npm install recharts zod ua-parser-js date-fns
   npm install -D @types/ua-parser-js
   ```

5. **Update Environment Variables**
   - Add JWT_SECRET to .env
   - Add any other required variables

### Development Order:

**Week 1: Links Management**
1. Create Link model
2. Implement Links APIs
3. Connect frontend to APIs
4. Test CRUD operations

**Week 2: Profile & Public View**
1. Update Profile APIs
2. Implement public profile page
3. Add profile preview
4. Test sharing

**Week 3: Theme Customization**
1. Create Theme APIs
2. Connect theme page
3. Apply themes to public profile
4. Test premium features

**Week 4: Analytics**
1. Create Analytics model
2. Implement tracking
3. Build analytics dashboard
4. Test data accuracy

---

## 📚 Additional Resources

### Documentation to Read:
- Next.js App Router: https://nextjs.org/docs/app
- Mongoose: https://mongoosejs.com/docs/
- Zustand: https://docs.pmnd.rs/zustand/
- JWT: https://jwt.io/introduction
- Tailwind CSS: https://tailwindcss.com/docs

### Similar Projects for Inspiration:
- Linktree: https://linktr.ee
- Bio.link: https://bio.link
- Beacons: https://beacons.ai

### Tools & Services:
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Cloudinary: https://cloudinary.com
- Vercel: https://vercel.com
- IP Geolocation: https://ip-api.com

---

## 🎉 Conclusion

This architecture document provides a comprehensive blueprint for building Droplink. The system is designed to be:

- **Scalable:** Can handle growing user base
- **Maintainable:** Clean code structure and separation of concerns
- **Secure:** JWT authentication, input validation, rate limiting
- **Performant:** Optimized queries, caching, CDN
- **User-friendly:** Intuitive UI/UX, responsive design

Follow the implementation roadmap, start with the highest priority features (Profile & Links), and iterate based on user feedback. Good luck building Droplink! 🚀

---

**Document Version:** 1.0  
**Last Updated:** November 22, 2025  
**Author:** Kiro AI Assistant  
**Project:** Droplink - Link-in-Bio Platform
