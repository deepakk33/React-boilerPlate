import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ApiLoader } from './components'
import 'react-toastify/dist/ReactToastify.css'
import { router } from './routes/routes.config'

function App() {
  return (
    <>
      <Suspense fallback={<ApiLoader type="linear" />}>
        <ErrorBoundary
          onError={(e: Error) => {
            console.log('error', e)
          }}
          fallback={
            <div>
              Something just happened. Please reload/refresh the application
            </div>
          }
        >
          <ApiLoader />

          <RouterProvider router={router} />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}

export default App
