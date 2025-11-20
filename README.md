# Vidio

A complete backend for a video streaming platform with user auth, video upload pipeline, like/dislike, comments, replies, and subscribe/unsubscribe APIs.

## Feature Highlights
- **User Authentication**: Registration with avatar/cover uploads, secure login, refresh-token rotation, password changes, and JWT-based session validation.
- **Video Pipeline**: Cloudinary-backed uploads, metadata management, watch history tracking, and endpoints for publishing, updating, or deleting videos.
- **Engagement Layer**: Comment threads with replies, tweet-style updates, and granular like/dislike toggles across videos, comments, and tweets.
- **Channel & Subscription APIs**: Channel profiles expose subscriber counts and watch stats, plus subscribe/unsubscribe flows for viewers.
- **Media Operations**: Multer disk storage, Cloudinary upload/delete helpers, and automatic cleanup of temporary files.

## Tech Stack
- Node.js 20+
- Express 5
- MongoDB + Mongoose with aggregate pagination
- JWT, cookie-parser, cors, dotenv
- Multer + Cloudinary for media handling

## Getting Started

### Prerequisites
- Node.js v20 or later
- npm v10 or later
- MongoDB instance (local or hosted)
- Cloudinary credentials

### Installation
```bash
git clone https://github.com/<your-handle>/vidio.git
cd vidio
npm install
```

### Environment Variables
Create a `.env` file in the project root:
```bash
PORT=8000
CORS_ORIGIN=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017
ACCESS_TOKEN_SECRET=change_me
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_SECRET=change_me_too
REFRESH_TOKEN_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
> `DB_NAME` is configured in `src/constants.js` and defaults to `Backend`.

### Run the Server
```bash
npm run dev
```
The dev script loads environment variables, connects to MongoDB, and boots the API at `http://localhost:8000`.

## API Overview

| Area | Highlights |
| --- | --- |
| `/api/v1/users` | Register/login/logout, refresh tokens, change password, get current user, update account, upload avatar/cover, fetch channel profile, get watch history. |
| `/api/v1/videos` | Entry points for listing, publishing, updating, deleting, and toggling publish status of videos. |
| `/api/v1/comments` | CRUD for video comments plus pagination, owner population, and reply flows. |
| `/api/v1/likes` | Toggle likes/dislikes on videos, comments, and tweets; fetch liked videos with owner info. |
| `/api/v1/tweets` | Short-form updates linked to user profiles. |

Add the relevant routers in `src/app.js` to expose additional modules.

## Folder Structure
```
src/
  app.js              // Express app + middleware wiring
  index.js            // Server bootstrap + DB connection
  controllers/        // Feature controllers (user, video, comment, tweet, like)
  models/             // Mongoose schemas
  routes/             // Express routers per feature
  middlewares/        // JWT auth, Multer upload helpers
  utils/              // ApiError/ApiResponse, async handler, Cloudinary helpers
  db/                 // Mongo connection
public/
  temp/               // Multer disk storage target
```

## License
This project currently uses the ISC license (see `package.json`).

