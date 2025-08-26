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

   layout('routes/auth/layout.tsx', [route('login', 'routes/auth/login.tsx')]),
] satisfies RouteConfig;
