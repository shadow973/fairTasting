export interface User {
  id: string,
  email: string,
  firstname: string,
  lastname: string,
  gender: string,
  dob: string,
  is_betatester: boolean,
  is_internal: boolean,
  is_client: boolean,
  is_ambassador: boolean,
  is_disabled: boolean,
  default_locale: string
}

export interface UserCredentials {
  email: string,
  password: string,
}

export interface PasswordVerification {
  email: string,
  password: string,
  code: string,
}

export interface BetaTesterInput{
  firstname: string,
  lastname: string,
  email: string,
  device: string,
  city: string,
  country: string,
  locale: string
}