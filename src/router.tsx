import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'

const router = createBrowserRouter([
  // Auth routes

  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/login.tsx')).default,
    }),
  },

  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/pages/chequebooks')).default,
        }),
      },
      {
        path: 'chequebooks',
        lazy: async () => ({
          Component: (await import('@/pages/chequebooks/index.tsx')).default,
        }),
      },
      {
        path: 'companies',
        lazy: async () => ({
          Component: (await import('@/pages/companies/index.tsx')).default,
        }),
      },
      {
        path: 'subscribers',
        lazy: async () => ({
          Component: (await import('@/pages/subscribers/index.tsx')).default,
        }),
      },
      {
        path: 'services',
        lazy: async () => ({
          Component: (await import('@/pages/services/index.tsx')).default,
        }),
      },
      {
        path: 'ads',
        lazy: async () => ({
          Component: (await import('@/pages/ads/index.tsx')).default,
        }),
      }
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
