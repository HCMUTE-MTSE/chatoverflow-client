import {
   type RouteConfig,
   index,
   layout,
   route,
} from '@react-router/dev/routes';

export default [
   layout('routes/layout.tsx', [
      index('routes/home.tsx'),
      route('shop', 'routes/shop.tsx'),
      route('invoice', 'routes/invoice.tsx'),
      route('profile', 'routes/profile.tsx'),
   ]),

   layout('routes/auth/layout.tsx', [
      route('login', 'routes/auth/login.tsx'),
      route('register', 'routes/auth/register.tsx'),
      route('verify-register', 'routes/auth/verify-register.tsx'),
      route('forget-password', 'routes/auth/forget-password.tsx'),
      route('reset-password', 'routes/auth/reset-password.tsx'),
   ]),
] satisfies RouteConfig;
