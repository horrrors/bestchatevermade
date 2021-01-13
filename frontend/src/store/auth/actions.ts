import { AsyncAction } from 'overmind'
import { registerRequest } from '../../types/auth'

export const registration: AsyncAction<registerRequest> = async ({ effects }, value) => {
  const request = await effects.auth.api.registerRequest(value)
  console.log(request)
  debugger
}

