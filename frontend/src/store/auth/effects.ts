import axios from '../../utils/axiosConfig'
import { registerRequest } from '../../types/auth'

export const api = {
  registerRequest: ({ login, email, password }: registerRequest) => {
    return axios.get('register', { params: { login, email, password } })
  }
}
