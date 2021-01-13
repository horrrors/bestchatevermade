import { UserDto } from '../modules/user/dto/user.dto'
import { UserEntity } from "../modules/user/models/user.entity"

export const toUserDto = (user: UserEntity): UserDto => {
  const {  email, nickname } = user
  return { email, nickname }
}