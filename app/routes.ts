import {
  type RouteConfig,
  layout,
  index,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    route('shop', 'routes/shop.tsx'),
    route('invoice', 'routes/invoice.tsx'),
    route('tags', 'routes/tags.tsx'),

    route('', 'routes/protected/ProtectedRoute.tsx', [
      route('profile', 'routes/profile.tsx'),
      route('create-blog', 'routes/blog/create-blog.tsx'),
      route('blog/:slug/edit', 'routes/blog/edit-blog.tsx'),
    ]),

    route('ask', 'routes/ask.tsx'),
    route('/question/:id/edit', 'routes/question/editQuestion.tsx'),
    route('/question/:id', 'routes/question/question-detail.tsx'),

    route('communities', 'routes/communities.tsx'),

    route('blog', 'routes/blog/blog.tsx'),
    route('blog/:slug', 'routes/blog/view-blog.tsx'),

    route('collections', 'routes/collections/my-collections.tsx'),
  ]),

  layout('routes/auth/layout.tsx', [
    // Auth
    route('login', 'routes/auth/login.tsx'),
    route('register', 'routes/auth/register.tsx'),
    route('verify-register', 'routes/auth/verify-register.tsx'),
    route('forget-password', 'routes/auth/forget-password.tsx'),
    route('reset-password', 'routes/auth/reset-password.tsx'),
  ]),
] satisfies RouteConfig;
