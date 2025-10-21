# Introduction

Chatoverflow - Group 1 weeky project.

# Installation

You'll need to create your onw `.env` file add following variable:

```
VITE_API_BASE_URL=https://chatoverflow-server-side.vercel.app
VITE_PREFIX_AUTH=auth
```

And then install the dependencies:

```
pnpm i
```

# Run

```
pnpm run dev
```

# Testing:

## Route map

Base route:

```
http://localhost:5173/
```

Auth:

```
http://localhost:5173/login
```

```
http://localhost:5173/register
```

```
http://localhost:5173/verify-register
```

```
http://localhost:5173/forget-password
```

```
http://localhost:5173/reset-password
```

Credential for lived app at: [chatoverflow](https://chatoverflow-client.vercel.app/)

- Login &rarr; {admin@example.com, 12345678}

- Forget password &rarr; {nvhoai1020@gmail.com}

- Register &rarr; {your valid mail and info}

```
chatoverflow-client
├─ .dockerignore
├─ .prettierrc
├─ app
│  ├─ app.css
│  ├─ components
│  │  ├─ Header
│  │  │  ├─ Header.tsx
│  │  │  └─ index.tsx
│  │  ├─ Logo
│  │  │  ├─ Logo.module.css
│  │  │  └─ Logo.tsx
│  │  ├─ Navbar
│  │  │  ├─ Navbar.module.css
│  │  │  └─ Navbar.tsx
│  │  ├─ NavItem
│  │  │  └─ NavItem.tsx
│  │  ├─ page
│  │  │  ├─ ask-edit-question
│  │  │  │  ├─ CreateQuestion
│  │  │  │  │  ├─ CreateQuestion.tsx
│  │  │  │  │  └─ index.ts
│  │  │  │  └─ EditQuestion
│  │  │  │     ├─ EditQuestion.tsx
│  │  │  │     └─ index.ts
│  │  │  ├─ auth-pages
│  │  │  │  ├─ AuthFooter
│  │  │  │  │  ├─ AuthFooter.tsx
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ AuthHeader
│  │  │  │  │  ├─ AuthHeader.tsx
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ login
│  │  │  │  ├─ register
│  │  │  ├─ collections
│  │  │  │  ├─ MyBlogs
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ MyBlogs.tsx
│  │  │  │  └─ MyQuestions
│  │  │  │     ├─ index.ts
│  │  │  │     └─ MyQuestions.tsx
│  │  │  ├─ communities
│  │  │  │  ├─ Communities.tsx
│  │  │  │  └─ index.ts
│  │  │  ├─ home
│  │  │  │  ├─ FilterTabs
│  │  │  │  │  ├─ FilterTabs.tsx
│  │  │  │  │  └─ index.ts
│  │  │  ├─ statistics
│  │  │  └─ tags
│  │  └─ ui
│  │     ├─ Toast
│  │     │  ├─ index.ts
│  │     │  └─ ToastProvider.tsx
│  ├─ hooks
│  │  ├─ chat
│  │  ├─ search

│  ├─ lang
│  │  └─ en
│  │     ├─ blog.ts
│  │     ├─ header.ts
│  ├─ libs
│  │  ├─ icons.tsx
│  │  └─ tiptap
│  │     ├─ extensions.ts
│  │     └─ lowlight-languages.ts
│  ├─ models
│  │  ├─ constant
│  │  │  ├─ Address.dto.ts
│  │  │  ├─ answer-filters.ts
│  │  │  ├─ blog-filters.ts
│  │  │  └─ GetUser.dto.ts
│  │  ├─ reply.types.ts
│  │  ├─ req
│  │  │  ├─ createQuestion.request.ts
│  │  └─ res
│  │     ├─ api.response.ts
│  │     ├─ blog.response.ts
│  ├─ root.tsx
│  ├─ routes
│  │  ├─ ask.tsx
│  │  ├─ auth
│  │  │  ├─ forget-password.tsx
│  │  │  ├─ layout.tsx
│  │  │  ├─ login.tsx
│  │  │  ├─ logout.tsx
│  │  │  ├─ register.tsx
│  │  │  ├─ reset-password.tsx
│  │  │  └─ verify-register.tsx
│  │  ├─ blog
│  │  │  ├─ blog.tsx
│  │  │  ├─ create-blog.tsx
│  │  │  ├─ edit-blog.tsx
│  │  │  └─ view-blog.tsx
│  │  ├─ chat
│  │  │  └─ chat.tsx
│  │  ├─ collections
│  │  │  └─ my-collections.tsx
│  │  ├─ collections.tsx
│  │  ├─ communities.tsx
│  │  ├─ home.tsx
│  │  ├─ invoice.tsx
│  │  ├─ jobs.tsx
│  │  ├─ layout.tsx
│  │  ├─ profile-view.tsx
│  │  ├─ profile.tsx
│  │  ├─ protected
│  │  │  └─ ProtectedRoute.tsx
│  │  ├─ question
│  │  │  ├─ editQuestion.tsx
│  │  │  └─ question-detail.tsx
│  │  ├─ shop.tsx
│  │  ├─ statistics
│  │  │  └─ statistics.tsx
│  │  ├─ tags-questions.tsx
│  │  ├─ tags.tsx
│  │  └─ user
│  │     └─ user-profile.tsx
│  ├─ routes.ts
│  ├─ services
│  │  └─ api
│  │     ├─ auth
│  │     │  ├─ forgetPassword.service.ts
│  │     │  ├─ login.service.ts
│  │     ├─ blog
│  │     │  └─ blog.service.ts
│  │     ├─ chat
│  │     │  ├─ conversation.service.ts
│  │     │  ├─ message.service.ts
│  │     │  └─ participant.service.ts
│  ├─ utils
│  │  ├─ jwt.ts
│  │  └─ userUtils.ts
│  └─ welcome
│     ├─ logo-dark.svg
│     ├─ logo-light.svg
│     └─ welcome.tsx
├─ Dockerfile
├─ image.png
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  ├─ assets
│  │  └─ images
│  │     └─ defaultavatar.png
│  ├─ avatar.jpg
│  ├─ favicon.ico
│  ├─ images
│  │  ├─ notification-icon.svg
│  │  └─ search-icon.svg
│  └─ test-socket.html
├─ react-router.config.ts
├─ README.md
├─ tailwind.config.js
├─ test.json
├─ tsconfig.json
└─ vite.config.ts

```
