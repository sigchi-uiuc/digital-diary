# Authentication Setup

This application now includes NextAuth.js authentication with the following features:

## Features

- **User Registration**: Users can create accounts with email, username, and password
- **User Login**: Existing users can sign in with email and password
- **Password Hashing**: Passwords are securely hashed using bcrypt
- **Session Management**: JWT-based sessions with NextAuth
- **Protected Routes**: Middleware protects authenticated routes
- **Database Integration**: User data stored in PostgreSQL with Prisma

## Environment Variables Required

Create a `.env.local` file in the root directory with:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
DATABASE_URL=your-postgresql-database-url
```

## Database Setup

The application uses the following Prisma models for authentication:

- **User**: Extended with NextAuth fields (emailVerified, accounts, sessions)
- **Account**: OAuth provider accounts
- **Session**: User sessions
- **VerificationToken**: Email verification tokens

## API Routes

- `POST /api/auth/signup` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth authentication

## Pages

- `/auth/signin` - Login page
- `/auth/signup` - Registration page
- `/` - Main dashboard (protected)

## Usage

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Sign Up" to create a new account
4. Or click "Sign In" if you already have an account
5. Once authenticated, you'll see the dashboard with your username

## Security Features

- Passwords are hashed with bcrypt (12 rounds)
- JWT tokens for session management
- CSRF protection via NextAuth
- Route protection via middleware
- Input validation on both client and server

## Next Steps

- Add email verification for new accounts
- Implement password reset functionality
- Add OAuth providers (Google, GitHub, etc.)
- Enhance user profile management
