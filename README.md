# Droplink - All Your Links in One Place

A modern, customizable link-in-bio platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Landing Page** - Beautiful hero section with feature highlights
- **Authentication** - Login and signup pages (UI only, backend integration pending)
- **Dashboard** - Complete profile management interface with:
  - Profile settings (bio, profile picture)
  - Link management (add, edit, delete links)
  - Theme customization (premium feature)
  - Live preview of public profile
- **Public Profile** - Dynamic user profile pages with customizable themes
- **Responsive Design** - Mobile-first, works beautifully on all devices

## 🛠️ Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React Icons

## 📦 Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── page.tsx              # Landing page
├── login/page.tsx        # Login page
├── signup/page.tsx       # Signup page
├── dashboard/page.tsx    # Dashboard with profile/links/theme tabs
├── [username]/page.tsx   # Dynamic public profile page
├── layout.tsx            # Root layout
└── globals.css           # Global styles
```

## 🎨 Pages

### Landing Page (`/`)
- Hero section with call-to-action
- Feature highlights
- Sample profile preview
- Footer with links

### Login (`/login`)
- Email and password fields
- Link to signup page

### Signup (`/signup`)
- Username, email, and password fields
- Link to login page

### Dashboard (`/dashboard`)
- **Profile Tab**: Edit bio and profile picture
- **My Links Tab**: Add, edit, and delete links
- **Theme Tab**: Customize colors and background (premium feature)
- Live preview of public profile

### Public Profile (`/[username]`)
- User profile with bio
- List of social links
- Customizable theme (for premium users)

## 🔮 Next Steps

This is the frontend UI only. Future enhancements:

- Backend API integration
- User authentication (NextAuth.js or similar)
- Database integration (PostgreSQL/MongoDB)
- Analytics and link tracking
- Premium subscription system
- Custom domains
- QR code generation

## 📝 Notes

- Currently uses mock data for demonstration
- All forms are functional but don't persist data yet
- Theme customization is available for premium users (mock status)

---

Built with ❤️ using Next.js and Tailwind CSS
