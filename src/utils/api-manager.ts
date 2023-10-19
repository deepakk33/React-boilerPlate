import axios, {
  AxiosRequestConfig,
  GenericAbortSignal,
  Method,
  RawAxiosRequestHeaders,
} from 'axios'
import { API_BASE_URL, HttpStatus, STORAGE } from './constants'
import { ApiResponse } from '@app/models/api.model'
import { getAlert } from '../hooks/useAlert.hooks'
import { ROUTES_CONST } from '@app/routes/routes'
import {
  keyExistsInLocalStorage,
  getActualResponseFromAxiosRequest,
  returnParsedJson,
  containerScrollToTop,
  clearStorage,
  getFromLocalStorage,
} from './helpers'
import {
  keycloakCredentials,
  updateTokenIfMinValidityReached,
} from './keycloak'

const defaultHeaders = {
  'Content-Type': 'application/json; charset=UTF-8',
}

let loaderCount = 0

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    ...defaultHeaders,
  },
})

axiosInstance.interceptors.request.use(async (config) => {
  if (keyExistsInLocalStorage(STORAGE.ACCESS_TOKEN_KEY)) {
    await updateTokenIfMinValidityReached()
    const token: string = getFromLocalStorage(STORAGE.ACCESS_TOKEN_KEY) || ''
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) return response.data
  },
  (error) => {
    if (
      error &&
      error.response &&
      error.response.status === HttpStatus.Unauthorized
    ) {
      clearStorage()
      keycloakCredentials.logout({
        redirectUri: `${window.location.origin}/${ROUTES_CONST.AUTH}`,
      })
      return Promise.reject({ show: false })
    }
    const parsedJson = returnParsedJson(
      getActualResponseFromAxiosRequest(error)
    )
    if (!parsedJson) {
      if (error.message === 'Network Error') {
        return Promise.reject({ show: false })
      }
      return Promise.reject(error)
    }
    return Promise.reject(JSON.parse(getActualResponseFromAxiosRequest(error)))
  }
)
// endpoint: string,
//   data: any = {},
//   customHeaders: RawAxiosRequestHeaders = {},
//   showLoader = true,
//   showSuccessAlert = true
// ) => {

const axiosRequest = async (config: {
  method: Method | string
  endpoint: string
  data: any
  params: AxiosRequestConfig<any>
  customHeaders: RawAxiosRequestHeaders
  showLoader: boolean
  showSuccessAlert: boolean
  showErrorAlert: boolean
  scrollToTop?: boolean
  signal?: GenericAbortSignal
  rest?: AxiosRequestConfig<any>
}) => {
  if (config.showLoader) showLoading()

  return axiosInstance
    .request({
      method: config.method,
      url: config.endpoint,
      data: config.data,
      headers: {
        ...config.customHeaders,
      },
      params: { ...config.params },
      ...config.rest,
    })
    .then((resp) => {
      if (config.scrollToTop) containerScrollToTop()
      showSuccessAlertMessage(config.showSuccessAlert, resp)
      return resp
    })
    .catch((error) => {
      if (error && error.message && config.showErrorAlert) {
        getAlert('error', error.message)
      }
      throw error
    })
    .finally(() => {
      showLoadingDisplay(config.showLoader)
    })
}

const showLoading = () => {
  const linearLoader = document.getElementsByClassName('apiLoader')
  if (linearLoader && linearLoader.length > 0) {
    loaderCount += 1
    linearLoader[0].classList.remove('hidden')
  }
}

const hideLoading = () => {
  const linearLoader = document.getElementsByClassName('apiLoader')
  loaderCount -= 1
  if (linearLoader && linearLoader.length > 0 && loaderCount <= 0) {
    linearLoader[0].classList.add('hidden')
  }
}

const showSuccessAlertMessage = (
  showSuccessAlert: boolean,
  resp: ApiResponse<unknown>
) => {
  if (
    showSuccessAlert &&
    resp &&
    resp.message &&
    typeof resp.message === 'string'
  ) {
    getAlert('success', resp.message)
  }
}

// const showErrorAlertMessage = (error) => {
//   if (error && error.message) {
//     getAlert('error', error.message)
//   }
// }

const showLoadingDisplay = (showLoader: boolean) => {
  if (showLoader) {
    hideLoading()
  }
}

const getAPI = async (
  endpoint: string,
  customHeaders = {},
  params = {},
  showLoader = true,
  showSuccessAlert = false,
  showErrorAlert = true
) => {
  return axiosRequest({
    method: 'get',
    endpoint,
    data: null,
    params,
    customHeaders,
    showLoader,
    showSuccessAlert,
    showErrorAlert,
  })
}

const postAPI = async (
  endpoint: string,
  data = {},
  params = {},
  customHeaders = {},
  showLoader = true,
  showSuccessAlert = true,
  showErrorAlert = true,
  scrollToTop = false
) => {
  return axiosRequest({
    method: 'post',
    endpoint,
    data,
    params,
    customHeaders,
    showLoader,
    showSuccessAlert,
    showErrorAlert,
    scrollToTop,
  })
}

const putAPI = async (
  endpoint: string,
  data = {},
  params = {},
  customHeaders = {},
  showLoader = true,
  showSuccessAlert = true
) => {
  return axiosRequest({
    method: 'put',
    endpoint,
    data,
    params,
    customHeaders,
    showLoader,
    showSuccessAlert,
    showErrorAlert: true,
  })
}

const deleteAPI = async (
  endpoint: string,
  data = {},
  params = {},
  customHeaders = {},
  showLoader = true,
  showSuccessAlert = true
) => {
  return axiosRequest({
    method: 'delete',
    endpoint,
    data,
    params,
    customHeaders,
    showLoader,
    showSuccessAlert,
    showErrorAlert: true,
  })
}
// FIXME: NEED TO REFINE THIS FUNCTION

const getBlob = async (
  endpoint: string,
  customHeaders = {},
  params = {},
  showLoader = true,
  showSuccessAlert = false,
  // onDownloadProgress,
  signal?: GenericAbortSignal,
  param = {}
) => {
  return axiosRequest({
    method: 'get',
    endpoint,
    params,
    customHeaders,
    showLoader,
    showSuccessAlert,
    data: undefined,
    showErrorAlert: true,
    signal,
  })
}
// FIXME: NEED TO REFINE THIS FUNCTION
const postBlob = async (
  endpoint: string,
  params = {},
  customHeaders = {},
  // responseType,
  // onDownloadProgress,
  // onUploadProgress,
  signal: GenericAbortSignal,
  showLoader = true,
  showSuccessAlert = true,
  showErrorAlert = true,
  { ...rest }: AxiosRequestConfig<any>
) => {
  return axiosRequest({
    method: 'post',
    endpoint,
    params,
    customHeaders,
    showLoader,
    showSuccessAlert,
    showErrorAlert,
    signal,
    data: undefined,
    ...rest,
  })
}

const patch = async (
  endpoint: string,
  data = {},
  customHeaders = {},
  showLoader = true,
  showSuccessAlert = true
) => {
  return axiosRequest({
    method: 'patch',
    endpoint,
    data,
    customHeaders,
    showLoader,
    showSuccessAlert,
    params: {},
    showErrorAlert: true,
  })
}

const getAxiosInstance = () => {
  return axiosInstance
}

export {
  deleteAPI,
  getAPI,
  getAxiosInstance,
  getBlob,
  patch,
  postAPI,
  postBlob,
  putAPI,
}
