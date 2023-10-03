import { ToastContentProps } from 'react-toastify'
import { STANDARD_TOAST_TIMEOUT } from '@wizard/utils/constants'
import {
  toast,
  ToastPosition,
  ToastBody,
  Slide,
  ToastCloseIcon,
} from '@gaia-x-frontend/components-lib'

type AlertType = 'info' | 'error' | 'success' | 'warning'

const useAlert = (
  type: AlertType,
  message: string,
  isFocusLoss = true,
  duration = STANDARD_TOAST_TIMEOUT,
  position: ToastPosition = 'top-right'
) => {
  toast.dismiss()
  return toast(
    (props: ToastContentProps) => <ToastBody {...props} message={message} />,
    {
      type,
      position,
      autoClose: duration,
      transition: Slide,
      pauseOnFocusLoss: isFocusLoss,
      className: 'Toastify__toast--main',
      closeButton: ToastCloseIcon,
      hideProgressBar: true,
    }
  )
}

export { useAlert as getAlert }
