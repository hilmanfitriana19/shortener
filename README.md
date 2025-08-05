# LinkShort - Beautiful Link Shortener

A modern, feature-rich link shortener application built with React, TypeScript, and Firebase.

## Features

- 🔗 **Link Shortening**: Create short, memorable links from long URLs
- 🎨 **Dark Mode**: Modern dark appearance across the app
- 📊 **Analytics**: Track clicks and performance for each link
- 🔐 **Google Authentication**: Secure login with Firebase Auth
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Real-time Updates**: Live sync across all your devices
- 🎯 **Custom Aliases**: Create branded short links
- 📝 **Link Management**: Add titles, descriptions, and organize your links

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and Firestore Database
3. Configure Google Sign-in method in Authentication
4. Copy `.env.example` to `.env` and fill in your Firebase configuration

## Firestore Database Structure

### Collections

#### `users/{userId}`
```javascript
{
  uid: string,
  displayName: string,
  email: string,
  photoURL: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `links/{linkId}`
```javascript
{
  id: string,
  userId: string,          // Reference to user who created the link
  originalUrl: string,     // The original long URL
  shortCode: string,       // Generated short code (e.g., "abc123")
  customAlias?: string,    // Optional custom alias
  title?: string,          // Optional title for the link
  description?: string,    // Optional description
  clicks: number,          // Number of times clicked
  createdAt: timestamp,
  updatedAt: timestamp,
  isActive: boolean        // Whether the link is active
}
```

#### `linkClicks/{clickId}` (Optional - for detailed analytics)
```javascript
{
  id: string,
  linkId: string,         // Reference to the link
  timestamp: timestamp,
  userAgent?: string,     // Browser/device info
  ip?: string,           // IP address (if tracking enabled)
  referrer?: string      // Referring website
}
```

### Security Rules

Add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own links
    match /links/{linkId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Link clicks can be created by anyone (for public access)
    match /linkClicks/{clickId} {
      allow create: if true;
      allow read: if request.auth != null;
    }
  }
}
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update it with your Firebase values
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with your Firebase configuration. You can use the
provided `.env.example` file as a starting point:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
```

### Using Short Links

Access any generated link at `/redirect/<code>` on your domain. The app will
automatically redirect you to the original URL.

## Theme System

The interface uses a single dark theme for a consistent experience. The theme is applied automatically on every visit.

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy to your preferred hosting service (Netlify, Vercel, Firebase Hosting, etc.)

## License

MIT License - feel free to use this project for personal or commercial purposes.