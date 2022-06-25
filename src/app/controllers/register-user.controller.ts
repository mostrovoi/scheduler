import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  CreateUserUseCase,
  CreateUserDTO,
} from '@user/application/create-user.use-case';
import { UserRole, UserRoleList } from 'src/main/user/domain/user-role';
import { IsEnum, IsNotEmpty } from 'class-validator';

class RegisterUserDTO implements CreateUserDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsEnum(UserRole, {
    message: 'Role should be one of: ' + UserRoleList.join(', '),
  })
  role: UserRole;
}

@Controller('user/register')
export class RegisterUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  register(@Body() registerUser: RegisterUserDTO): Promise<void> {
    return this.createUserUseCase.execute(registerUser);
  }
}