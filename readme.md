# Algonix

Algonix is a full-stack coding practice platform. Users can browse coding problems, write and execute solutions, submit code, track solved problems and login activity, and organize problems into playlists. Administrators can create, update, and delete problems.

## Features

- React coding workspace with Monaco Editor
- Problem catalog with Easy, Medium, and Hard difficulty levels
- JavaScript, Python, and Java code execution through Judge0
- Code submissions with result, time, memory, and test-case details
- User registration, login, email verification, refresh tokens, and optional Google OAuth
- User profiles, solved-problem tracking, streaks, and login activity
- Public and private playlists for organizing problems
- Admin-only problem management
- Responsive UI built with Tailwind CSS and DaisyUI

## Stack

### Frontend

- React 19 and React Router
- Vite
- Tailwind CSS and DaisyUI
- Monaco Editor
- Zustand for client state
- Axios for API requests
- React Hook Form and Zod for forms and validation
- Lucide React, React Icons, Motion, and React Hot Toast

### Backend

- Node.js with Express 5
- PostgreSQL with Prisma 6
- Passport Google OAuth 2.0
- Express sessions and cookie-based authentication
- Judge0 for code execution
- Cloudinary for image uploads
- Nodemailer and Mailtrap-compatible SMTP for verification email

## Project Structure

```text
algonix/
├── BACKEND/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   ├── generated/prisma/
│   │   ├── libs/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── index.js
│   └── package.json
├── FRONTEND/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── Layout/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.jsx
│   └── package.json
└── readme.md
```

## Requirements

- Node.js 18 or newer
- npm
- PostgreSQL database
- Judge0-compatible API credentials for code execution

## Local Setup

Clone the repository and install dependencies in both applications:

```bash
git clone https://github.com/vishalraghav321/Algonix.git
cd Algonix

cd BACKEND
npm install

cd ../FRONTEND
npm install
```

Create `BACKEND/.env` with the values required by the backend:

```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
BASE_URI=http://localhost:3000

DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/algonix
SESSION_SECRET=replace-with-a-long-random-value
JWT_ACCESS_TOKEN_SECRET=replace-with-a-long-random-value
JWT_REFERSH_TOKEN_SECRET=replace-with-a-long-random-value
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
RAPIDAPI_KEY=your-rapidapi-key
RAPIDAPI_HOST=judge0-ce.p.rapidapi.com

# Required for Google login
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/auth/google/callback

# Required for email verification
MAILTRAP_HOST=your-smtp-host
MAILTRAP_PORT=2525
MAILTRAP_USERNAME=your-smtp-username
MAILTRAP_PASSWORD=your-smtp-password
MAILTRAP_SENDERMAIL=no-reply@example.com

# Required for avatar uploads
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Generate the Prisma client and apply the existing migrations:

```bash
cd BACKEND
npx prisma generate
npx prisma migrate deploy
```

Start the backend and frontend in separate terminals:

```bash
# Terminal 1
cd BACKEND
npm run dev
```

```bash
# Terminal 2
cd FRONTEND
npm run dev
```

Open `http://localhost:5173` in a browser. The backend listens on `http://localhost:3000` by default.

## Available Scripts

### Backend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with Nodemon |
| `npm start` | Start the API with Node.js |

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## API Overview

All API routes are prefixed with `/api/v1`. Protected routes require the authenticated session or access token.

### Authentication: `/auth`

- `POST /register`
- `POST /login`
- `GET /logout`
- `GET /check`
- `GET /refreshTokens`
- `GET /verifyMail/:token`
- `GET /google`
- `GET /google/callback`

### Problems: `/problems`

- `GET /get-all-problems`
- `GET /get-problem/:id`
- `GET /get-solved-problems`
- `POST /create-problem` (admin)
- `PUT /update-problem/:id` (admin)
- `DELETE /delete-problem/:id` (admin)

### Code Execution: `/execute-code`

- `POST /`

### Submissions: `/submission`

- `GET /get-all-submissions`
- `GET /get-submission/:problemId`
- `GET /get-submission-count/:problemId`

### Playlists: `/playlist`

- `GET /`
- `GET /getPlaylistDetails/:playlistId`
- `POST /create-playlist`
- `POST /:playlistId/add-problem`
- `DELETE /deletePlaylist/:playlistId`
- `DELETE /:playlistId/remove-problem`

## Production Notes

- Configure `FRONTEND_URL`, `BASE_URI`, OAuth callback URLs, cookies, and database credentials for the deployed domains.
- Set `NODE_ENV=production` so the backend uses secure cookies and the PostgreSQL-backed session store.
- Build the frontend with `npm run build` and deploy the generated `FRONTEND/dist` directory to a static host.
- Run `npx prisma migrate deploy` during backend deployment before starting the API.
