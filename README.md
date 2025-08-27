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

-  Login &rarr; {admin@example.com, 12345678}

-  Forget password &rarr; {nvhoai1020@gmail.com}

-  Register &rarr; {your valid mail and info}
