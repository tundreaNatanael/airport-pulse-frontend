import { createBrowserRouter } from 'react-router-dom'
import { ConfirmationPage } from '../features/intake/ConfirmationPage'
import { IntakePage } from '../features/intake/IntakePage'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <IntakePage />,
  },
  {
    path: '/confirmation',
    element: <ConfirmationPage />,
  },
])
