import { authState } from '../../types/auth'

export const state: authState = {
  token: localStorage.getItem('token') || '',
  user_id: JSON.parse(localStorage.getItem('user_id') || 'null'),
  get isAuthUser() {
    return !!this.user_id
  }
}