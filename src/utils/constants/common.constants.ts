// API config constants
export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
  PutMultipart = 'putMultiPart',
  PostMultipart = 'postMultiPart',
}

export enum HttpStatus {
  Success = 200,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
}

export enum ApiStatus {
  Pending = 'pending',
  InProgress = 'in progress',
  Success = 'success',
  Failure = 'failure',
}

export enum Operators {
  Contain = 'CONTAIN',
  NotContain = 'NOT_CONTAIN',
  Equals = 'EQUALS',
  NotEqual = 'NOT_EQUAL',
  In = 'IN',
  NotIn = 'NOT_IN',
  GreaterThan = 'GREATER_THAN',
  LesserThan = 'LESSER_THAN',
  GreaterEquals = 'GREATER_EQUALS',
  LesserEquals = 'LESSER_EQUALS',
  True = 'TRUE',
  False = 'FALSE',
  Null = 'NULL',
  NotNull = 'NOT_NULL',
}

export enum MasterType {
  SubDivision = 'subdivision',
  RegistrationType = 'registration',
  Standard = 'standard',
  EntityType = 'entity',
  RequestType = 'request',
  AccessType = 'access',
  FormateType = 'format',
}

export enum RouteType {
  Public,
  NonParticipant,
  Participant,
}
// resources constant

export enum ResourceType {
  Physical = 'PhysicalResource',
  Virtual = 'VirtualResource',
}

export enum ResourceSubType {
  Software = 'VirtualSoftwareResource',
  Data = 'VirtualDataResource',
}

// chip options constant

export enum InputChipsAddOnOption {
  Tab = 'Tab',
  Comma = ',',
  Enter = 'Enter',
}

export const CHIPS_OPTIONS = [
  InputChipsAddOnOption.Enter,
  InputChipsAddOnOption.Tab,
  InputChipsAddOnOption.Comma,
]

//  user config constant
export const INITIAL_USER_CONFIG = {
  id: '',
  email: '',
  did: '',
  legalName: '',
  participantType: '',
  privateKeyRequired: false,
  ownDidSolution: undefined,
  keyStored: false,
  legalParticipantUrl: '',
  status: 0,
}

//  pagination constants
export const INITIAL_PAGINATION = { pageIndex: 0, pageSize: 10 }
export const STANDARD_LIMIT_FOR_PAGINATION = 20

//  miscellaneous
export const ZERO = 0
export const ONE = 1
export const FILE_SIZE_1MB = 1 * 1024 * 1000
export const STAR_MAX_LEVEL = 3
export const STANDARD_TOAST_TIMEOUT = 5 * 1000
export const DATE_TIME_FORMATE = 'YYYY-MM-DD HH:mm:ss.000'
export const DASHBOARD_CONTAINER_ID = 'contentContainerId'
