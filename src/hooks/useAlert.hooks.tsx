import { ToastContentProps, ToastPosition } from 'react-toastify'
import { STANDARD_TOAST_TIMEOUT } from '@wizard/utils/constants'
import { ToastBody, toast, Slide } from '@wizard/stories'

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
      hideProgressBar: true,
    }
  )
}

export { useAlert as getAlert }
