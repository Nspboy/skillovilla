# SkilloVilla — Full Stack E-Learning Platform

**SkilloVilla** is a comprehensive full-stack e-learning platform designed to manage courses, students, mentors, and placements. It features a robust REST API backend and a modern React frontend for handling user authentication, course enrollments, live sessions, and more.

- **Backend**: Express + MongoDB (Mongoose)
- **Frontend**: React + Vite + React Router

---

## 📁 Project Structure

```
skillovilla/
├── client/                 — React frontend (Vite + React Router)
│   ├── src/
│   │   ├── components/     — Reusable UI components
│   │   ├── pages/          — Page components (Landing, Courses, Dashboard, etc.)
│   │   ├── services/       — API service layer
│   │   ├── App.jsx         — Main app with routing
│   │   └── main.jsx        — Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── config/
│   └── db.js               — MongoDB connection
├── middleware/
│   └── auth.js             — JWT protect + restrictTo
├── models/
│   ├── User.js             — Users (students, mentors, admin)
│   ├── Course.js           — Courses + curriculum
│   ├── Enrollment.js       — Student ↔ Course link + progress
│   ├── Mentor.js           — Mentor profiles + availability
│   ├── Session.js          — LiveClass + MentorSession
│   ├── Placement.js        — Company, Job, Placement, Application
│   └── Blog.js             — Blog posts + Certificate
├── routes/
│   ├── auth.js             — Register, Login, Reset password
│   ├── courses.js          — Course CRUD + Enroll + Progress
│   ├── mentors.js          — Mentor CRUD + Book session
│   ├── placements.js        — Companies, Jobs, Applications, Hall of Fame
│   ├── blogs.js            — Blog CRUD + Like + Comment
│   ├── sessions.js         — Live classes + Student dashboard
│   └── upload.js           — File upload handler
├── seed/
│   └── seed.js             — Populate all collections with demo data
├── server.js               — Express app entry point
├── .env.example            — Environment variable template
└── package.json
```

---

## ⚡ Quick Start

### Backend Setup

```bash
# 1. Install backend dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env — set MONGO_URI and JWT_SECRET

# 3. Seed the database
npm run seed

# 4. Start the backend server
npm run dev          # development (nodemon)
npm start            # production
```

The backend API will run on `http://localhost:5000`

### Frontend Setup

```bash
# 1. Navigate to client directory
cd client

# 2. Install frontend dependencies
npm install

# 3. Create .env file (optional - defaults to localhost:5000)
cp .env.example .env

# 4. Start the frontend dev server
npm run dev
```

The frontend will run on `http://localhost:3000` and proxy API requests to the backend.

---

## 🗄️ MongoDB Collections & Schemas

### `users`
| Field | Type | Notes |
|---|---|---|
| `name` | String | required |
| `email` | String | unique, required |
| `phone` | String | optional |
| `password` | String | bcrypt hashed, hidden by default |
| `role` | Enum | `student` \| `mentor` \| `admin` |
| `avatar` | String | URL |
| `isVerified` | Boolean | email verification flag |
| `enrolledCourses` | ObjectId[] | refs → Enrollment |
| `certificates` | ObjectId[] | refs → Certificate |
| `hoursLearned` | Number | aggregate |
| `sessionsAttended` | Number | aggregate |
| `googleId` / `linkedinId` | String | OAuth |
| `resetToken` / `resetTokenExpiry` | String/Date | password reset |

---

### `courses`
| Field | Type | Notes |
|---|---|---|
| `title` | String | required |
| `description` | String | required |
| `category` | Enum | Tech / Business / Design / Marketing |
| `level` | Enum | Beginner / Intermediate / Advanced |
| `duration` | String | "6 months" |
| `price` | Number | INR |
| `tag` | String | Bestseller, Hot, etc. |
| `color` / `icon` | String | UI display |
| `instructor` | ObjectId | ref → User |
| `rating` / `ratingCount` | Number | aggregated |
| `enrolled` | Number | incremented on enrollment |
| `curriculum` | Array | [{title, duration, topics[], order}] |
| `liveClassSchedule` | String | human-readable schedule |
| `isPublished` / `isFeatured` | Boolean | visibility |

**Index:** `{ title: "text", description: "text", category: "text" }` for full-text search

---

### `enrollments`
| Field | Type | Notes |
|---|---|---|
| `student` | ObjectId | ref → User |
| `course` | ObjectId | ref → Course |
| `status` | Enum | active / completed / paused / refunded |
| `progress` | Number | 0–100 % |
| `completedModules` | Number[] | module order indexes |
| `amountPaid` | Number | INR |
| `paymentId` | String | Razorpay/Stripe ID |
| `certificateIssued` | Boolean | |
| `enrolledAt` / `completedAt` | Date | |

**Unique index:** `{ student, course }` — prevents duplicate enrollment

---

### `mentors`
| Field | Type | Notes |
|---|---|---|
| `user` | ObjectId | ref → User (unique) |
| `initials` / `color` | String | UI avatar |
| `role` / `company` | String | "Senior SDE @ Google" |
| `experience` | String | "8 years" |
| `expertise` | String[] | ["React", "Node.js"] |
| `hourlyRate` | Number | INR per session |
| `rating` / `ratingCount` | Number | from session feedback |
| `totalSessions` | Number | count |
| `availableSlots` | Array | [{day, startTime, endTime, isBooked}] |
| `linkedinUrl` / `bio` | String | profile |
| `isActive` | Boolean | visibility |

---

### `liveclasses`
| Field | Type | Notes |
|---|---|---|
| `course` | ObjectId | ref → Course |
| `mentor` | ObjectId | ref → Mentor |
| `title` / `description` | String | |
| `scheduledAt` | Date | required |
| `durationMins` | Number | default 60 |
| `streamUrl` / `recordingUrl` / `meetingId` | String | streaming |
| `status` | Enum | scheduled / live / completed / cancelled |
| `attendees` | ObjectId[] | ref → User |
| `attendeeCount` | Number | |
| `notes` / `resources` | String/Array | post-session |

---

### `mentorsessions`
| Field | Type | Notes |
|---|---|---|
| `mentor` | ObjectId | ref → Mentor |
| `student` | ObjectId | ref → User |
| `scheduledAt` | Date | |
| `duration` | Number | minutes |
| `topic` / `meetingLink` | String | |
| `status` | Enum | pending / confirmed / completed / cancelled |
| `studentRating` | Number | 1–5 |
| `studentFeedback` / `sessionNotes` | String | |
| `amountPaid` / `paymentId` | Number/String | |

---

### `companies`
| Field | Type | Notes |
|---|---|---|
| `name` | String | unique |
| `logo` / `color` | String | initials + brand color |
| `website` / `sector` | String | |
| `isActive` | Boolean | |

---

### `jobs`
| Field | Type | Notes |
|---|---|---|
| `company` | ObjectId | ref → Company |
| `title` / `description` | String | |
| `eligibility` | String | enrollment requirement |
| `type` | Enum | Full-Time / Internship / Contract |
| `location` / `package` | String | |
| `deadline` | Date | |
| `isOpen` | Boolean | |

---

### `applications`
| Field | Type | Notes |
|---|---|---|
| `student` | ObjectId | ref → User |
| `job` | ObjectId | ref → Job |
| `status` | Enum | applied / shortlisted / interview / offered / rejected |
| `resumeUrl` / `coverLetter` | String | |
| `appliedAt` / `updatedAt` | Date | |

**Unique index:** `{ student, job }` — one application per job

---

### `placements`
| Field | Type | Notes |
|---|---|---|
| `student` | ObjectId | ref → User |
| `company` | ObjectId | ref → Company |
| `course` | ObjectId | ref → Course |
| `role` | String | "Software Engineer" |
| `packageLPA` | String | "45 LPA" |
| `placedAt` | Date | |
| `testimonial` | String | |
| `isPublic` | Boolean | show in Hall of Fame |

---

### `blogs`
| Field | Type | Notes |
|---|---|---|
| `title` / `slug` | String | slug unique |
| `excerpt` / `content` | String | content is full HTML |
| `category` | Enum | Career / Tech / Business / Design / Marketing |
| `color` / `coverImage` | String | |
| `author` | ObjectId | ref → User |
| `tags` | String[] | |
| `readTime` | String | "8 min" |
| `views` | Number | auto-incremented on GET |
| `likes` | ObjectId[] | ref → User |
| `comments` | Array | [{user, text, createdAt}] |
| `isPublished` / `publishedAt` | Boolean/Date | |

---

### `certificates`
| Field | Type | Notes |
|---|---|---|
| `student` | ObjectId | ref → User |
| `course` | ObjectId | ref → Course |
| `enrollment` | ObjectId | ref → Enrollment |
| `certificateId` | String | "SV-2026-00123" — unique |
| `pdfUrl` | String | Vercel Blob / Cloudinary URL |
| `verificationCode` | String | unique, for public verify page |
| `issuedAt` | Date | |

---

## 🔌 API Reference

### Auth  `/api/auth`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Create account |
| POST | `/login` | Public | Get JWT token |
| GET | `/me` | Protected | Get own profile |
| POST | `/forgot-password` | Public | Send reset link |
| PATCH | `/reset-password/:token` | Public | Reset via token |
| PATCH | `/change-password` | Protected | Change password |

### Courses  `/api/courses`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List (filter: category, level, search, featured, page) |
| GET | `/:id` | Public | Single course detail |
| POST | `/` | Admin/Mentor | Create course |
| PATCH | `/:id` | Admin/Mentor | Update course |
| DELETE | `/:id` | Admin | Delete course |
| POST | `/:id/enroll` | Student | Enroll in course |
| GET | `/:id/enrollments` | Admin | All enrollments for a course |
| PATCH | `/:id/progress` | Student | Update module progress |

### Mentors  `/api/mentors`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List all mentors |
| GET | `/:id` | Public | Mentor profile |
| POST | `/` | Admin | Create mentor |
| PATCH | `/:id` | Admin/Self | Update profile |
| POST | `/:id/book` | Student | Book 1-on-1 session |
| GET | `/:id/sessions` | Mentor/Admin | All sessions |
| PATCH | `/sessions/:sessionId/feedback` | Student | Rate & review session |

### Placements  `/api/placements`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Hall of Fame (placements) |
| POST | `/` | Admin | Record new placement |
| GET | `/companies` | Public | All hiring companies |
| POST | `/companies` | Admin | Add company |
| GET | `/jobs` | Public | Open job listings |
| POST | `/jobs` | Admin | Post new job |
| PATCH | `/jobs/:id` | Admin | Update job |
| POST | `/jobs/:id/apply` | Student | Apply to job |
| GET | `/my-applications` | Student | Own applications |
| PATCH | `/applications/:id/status` | Admin | Update application status |

### Blogs  `/api/blogs`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List posts (filter: category, search, page) |
| GET | `/:slug` | Public | Full blog post (increments views) |
| POST | `/` | Admin/Mentor | Create post |
| PATCH | `/:id` | Author/Admin | Update post |
| DELETE | `/:id` | Author/Admin | Delete post |
| POST | `/:id/like` | Protected | Toggle like |
| POST | `/:id/comment` | Protected | Add comment |
| DELETE | `/:id/comment/:commentId` | Protected | Remove comment |

### Sessions  `/api/sessions`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/live` | Public | Live class schedule |
| GET | `/live/:id` | Public | Single class detail |
| POST | `/live` | Admin/Mentor | Schedule class |
| PATCH | `/live/:id` | Admin/Mentor | Update class |
| POST | `/live/:id/attend` | Student | Mark attendance |
| GET | `/dashboard` | Student | Personal dashboard (enrollments, sessions, certs, stats) |

---

## 🔑 Test Credentials (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@skillovilla.com | Password@123 |
| Mentor | arjun@skillovilla.com | Password@123 |
| Student | ravi@example.com | Password@123 |

---

## 🧪 Example Requests

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"Test@1234"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ravi@example.com","password":"Password@123"}'

# List courses (with filter)
curl "http://localhost:5000/api/courses?category=Tech&level=Beginner&page=1"

# Enroll in a course (need token)
curl -X POST http://localhost:5000/api/courses/<courseId>/enroll \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"paymentId":"rzp_test_abc123"}'

# Get student dashboard
curl http://localhost:5000/api/sessions/dashboard \
  -H "Authorization: Bearer <token>"
```
