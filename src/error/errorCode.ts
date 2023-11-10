export const stringErrorCode = (code: number): ErrorType => {
  const errorString = errorCode[code.toString()];
  if (errorString === undefined) {
    return 'INVALID_ERRORCODE';
  }
  return errorString;
};

const errorCode: { [index: string]: ErrorType } = {
  // 처리할 수 있는 에러
  '-20000': 'ALEADY_USER',
  '-20001': 'ALEADY_HAS_GROUP',
  '-20002': 'ALEADY_SCHEDULE_STARTED',
  '-20003': 'ALEADY_SCHEDULE_FIXED',
  '-20004': 'INVALID_INVITATION',

  '-10005': 'FORM_VALIDATION',
  '-10006': 'GO_TO_JOIN',

  // 처리할 수 없는 에러
  '-10000': 'TIMEOUT',
  '-10001': 'SERVER_ERROR',
  '-10002': 'INVALID_REQUEST',
  '-10003': 'INVALID_REQUEST',
  '-10004': 'INVALID_REQUEST',
  '-10007': 'SERVER_ERROR',

  '-11000': 'SCHEDULE_NOT_STARTED',
  '-11001': 'SCHEDULE_NOT_FIXED',

  '-21000': 'AUTHENTICATION',
  '-21001': 'AUTHORIZATION',
  '-21002': 'AUTHORIZATION',
  '-21003': 'INVALID_REQUEST',
  '-21004': 'AUTHORIZATION',
  '-21005': 'AUTHORIZATION',
  '-21006': 'INVALID_REQUEST',
  '-21007': 'INVALID_REQUEST',
  '-21008': 'INVALID_KAKAO_CODE',
};

type ErrorType =
  | 'ALEADY_USER'
  | 'ALEADY_HAS_GROUP'
  | 'ALEADY_SCHEDULE_STARTED'
  | 'ALEADY_SCHEDULE_FIXED'
  | 'INVALID_INVITATION'
  | 'FORM_VALIDATION'
  | 'GO_TO_JOIN'
  | 'TIMEOUT'
  | 'SERVER_ERROR'
  | 'SCHEDULE_NOT_STARTED'
  | 'SCHEDULE_NOT_FIXED'
  | 'AUTHENTICATION'
  | 'AUTHORIZATION'
  | 'INVALID_REQUEST'
  | 'INVALID_KAKAO_CODE'
  | 'INVALID_ERRORCODE';
