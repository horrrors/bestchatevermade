export type authState = {
  token: string,
  user_id: number,
  isAuthUser: boolean
}

export type registerRequest = {
  login: string,
  email: string,
  password: string
}