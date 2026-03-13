import { User } from "../database/entities/user.entity";
import { UserResponseDto } from "../dtos/user/response-user.dto";

export function userToUserResponseDto(user: User): UserResponseDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone
  };
}