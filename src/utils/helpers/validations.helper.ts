import { checkEmptyValue } from './common.helper'
import { REGEX } from '../constants'

export const validateRequired = (
  value: unknown,
  fieldName: string
): {
  key: boolean
  msg: string
}[] => {
  return [{ key: !checkEmptyValue(value), msg: `${fieldName} is required` }]
}

export const validateURL = (URLValue: string) => {
  return REGEX.WEB_URL.test(URLValue)
}

export const validateNumeric = (numeric: string) => {
  return REGEX.NUMBER_FORMAT.test(numeric)
}

export const validateEmailFormat = (mail: string) => {
  return REGEX.EMAIL_VALID.test(mail)
}

export const validateAlphaNumericFormat = (string: string) => {
  return REGEX.ALPHA_NUMBER_FORMAT.test(string)
}

export const validateAlphaNumericWithSpace = (value: string) => {
  return REGEX.ALPHA_NUMERIC_WITH_SPACE_REGEXP.test(value)
}

export const validationCheck = (values: any) => {
  const errors: any = {}

  Object.keys(values).forEach((item: any) => {
    if (Array.isArray(values[item])) {
      values[item].forEach((value: any) => {
        if (!value.key) {
          errors[item] = value.msg
        }
      })
    } else if (
      typeof values[item] === 'object' &&
      values[item] !== null &&
      Array.isArray(values[item]['fieldValidation'])
    ) {
      errors[item] = [...values[item]['fieldValidation']]
    }
  })
  return errors
}

//common validation
export const validateMinMaxLength = ({
  values,
  minLength,
  maxLength,
  fieldName,
}: {
  values: string
  minLength: number
  maxLength: number
  fieldName: string
}) => {
  return [
    {
      key:
        values &&
        minLength &&
        maxLength &&
        !(values.length < minLength || values.length > maxLength),
      msg: `${fieldName} length should be ${minLength} to ${maxLength} characters`,
    },
  ]
}

export const validateAlphaNumeric = (
  value: string,
  fieldName: string,
  isRequired = false
) => {
  console.log(
    value && !validateAlphaNumericFormat(value),
    validateAlphaNumericFormat(value)
  )
  return [
    {
      key: value && validateAlphaNumericFormat(value),
      msg: `${fieldName} should be alpha numeric`,
    },
    ...(isRequired
      ? validateRequired(value, fieldName)
      : [{ key: true, msg: '' }]),
  ]
}

export const validateEmail = (email: string) => {
  return [
    ...validateMinMaxLength({
      values: email,
      minLength: 8,
      maxLength: 100,
      fieldName: 'Email',
    }),
    {
      key: validateEmailFormat(email),
      msg: 'Email should be valid',
    },
    ...validateRequired(email, 'Email'),
  ]
}

export const validateChipsAsURL = (chips: string[]) => {
  let isValid = true
  if (chips && chips.length) {
    chips.forEach((url: string) => {
      if (!validateURL(url)) {
        isValid = false
      }
    })
  }
  return isValid
}

export const validateUrlChip = (
  urlList: string[],
  fieldName: string,
  isRequired = false
) => {
  return [
    {
      key: validateChipsAsURL(urlList),
      msg: `${fieldName} should be valid url`,
    },
    ...(isRequired
      ? validateRequired(urlList, fieldName)
      : [{ key: true, msg: '' }]),
  ]
}
export const validateUrlAsRequired = (urlValue: string, fieldValue: string) => {
  return [
    {
      key: urlValue && validateURL(urlValue),
      msg: `${fieldValue} should be valid url`,
    },
    ...validateRequired(urlValue, fieldValue),
  ]
}

export const validatePrivateKey = (privateKey: string) => {
  //TODO : add regex for PrivateKey if required
  const isValidPrivateKey =
    /-----BEGIN\s+PRIVATE KEY-----\s*([A-Za-z0-9+/=\s]+)\s*-----END\s+PRIVATE KEY-----/.test(
      privateKey
    )
  return [
    {
      key: isValidPrivateKey,
      msg: 'Enter a valid private key',
    },
    ...validateRequired(privateKey, 'Private Key'),
  ]
}
