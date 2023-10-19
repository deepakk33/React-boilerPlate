import { createBrowserRouter } from 'react-router-dom'
import { ROUTES_CONST } from './routes'
import { ApiLoader } from '@app/components'
import { PrivateContainerPage, Public } from '@app/pages'

const ROUTES = [
  {
    path: ROUTES_CONST.ROOT,
    element: (
      //   <NoAuthRoute>
      //     <AuthenticationPageLazy />
      //   </NoAuthRoute>
      <Public />
    ),
    loading: <ApiLoader type="linear" />,
    // errorElement: <ErrorPage />,
  },

  {
    path: ROUTES_CONST.PUBLIC,
    element: (
      <>
        <h1>this is public page </h1>
      </>
    ),
    loading: <ApiLoader type="linear" />,
  },
  {
    path: ROUTES_CONST.PRIVATE,
    element: <PrivateContainerPage />,
    loading: <ApiLoader type="linear" />,
    // errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: ROUTES_CONST.SERVICE_MANAGEMENT,
    //     element: <ServiceOfferingManagementPageLazy />,
    //     errorElement: <ErrorPage />,
    //     loading: <AppLoader type="linear" />,
    //     handle: {
    //       crumb: () => {
    //         return {
    //           link: ROUTES_CONST.SERVICE_MANAGEMENT,
    //           name: 'Service Management',
    //           key: 'serviceManagement',
    //         }
    //       },
    //     },
    //     children: [
    //       {
    //         path: '',
    //         element: <ServiceOfferingListPageLazy />,
    //         errorElement: <ErrorPage />,
    //         loading: <AppLoader type="linear" />,
    //       },
    //       {
    //         path: ROUTES_CONST.SERVICE_OFFERING_CREATE,
    //         element: <ServiceOfferingCreationPageLazy />,
    //         errorElement: <ErrorPage />,
    //         loading: <AppLoader type="linear" />,
    //         handle: {
    //           crumb: () => {
    //             return {
    //               link: ROUTES_CONST.PUBLIC_SERVICE_OFFERING_CREATE,
    //               name: 'Create Service',
    //               key: 'createService',
    //             }
    //           },
    //         },
    //       },
    //       {
    //         path: ROUTES_CONST.SERVICE_ID,
    //         element: <ServiceOfferingDetailsPageLazy />,
    //         errorElement: <ErrorPage />,
    //         loading: <AppLoader type="linear" />,
    //         handle: {
    //           crumb: () => {
    //             return {
    //               link: ROUTES_CONST.SERVICE_ID,
    //               name: 'Service details',
    //               key: 'servicedetails',
    //             }
    //           },
    //         },
    //       },
    //     ],
    //   },

    //   {
    //     path: ROUTES_CONST.RESOURCE_MANAGEMENT,
    //     element: <ResourceManagementPageLazy />,
    //     errorElement: <ErrorPage />,
    //     loading: <AppLoader type="linear" />,
    //     handle: {
    //       crumb: () => {
    //         return {
    //           link: ROUTES_CONST.RESOURCE_MANAGEMENT,
    //           name: 'Resource Management',
    //           key: 'resourceManagement',
    //         }
    //       },
    //     },
    //     children: [
    //       {
    //         path: '',
    //         element: <ResourceListPageLazy />,
    //         errorElement: <ErrorPage />,
    //         loading: <AppLoader type="linear" />,
    //       },
    //       {
    //         path: ROUTES_CONST.RESOURCE_CREATE,
    //         element: <ResourceCreationPageLazy />,
    //         errorElement: <ErrorPage />,
    //         loading: <AppLoader type="linear" />,
    //         handle: {
    //           crumb: () => {
    //             return {
    //               link: ROUTES_CONST.RESOURCE_CREATE,
    //               name: 'Create Resource',
    //               key: 'resourceCreate',
    //             }
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     path: ROUTES_CONST.WALLET,
    //     element: <WalletPageLazy />,
    //     errorElement: <ErrorPage />,
    //     loading: <AppLoader type="linear" />,
    //   },
    //   {
    //     path: ROUTES_CONST.PROFILE,
    //     element: <ProfilePageLazy />,
    //     errorElement: <ErrorPage />,
    //     loading: <AppLoader type="linear" />,
    //   },
    // ],
  },
  {
    path: '*',
    element: (
      <>
        <h1>page not found</h1>
      </>
    ),
    // errorElement: <ErrorPage />,
    loading: <ApiLoader type="linear" />,
  },
]

const router = createBrowserRouter(ROUTES)

export { router }
