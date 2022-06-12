import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import { RegisterUserDto } from '../dto/user.register';
import { UsersService } from '../services/users.service';

@Controller('v1')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiBody({
    description: 'This body payload register User',
    type: RegisterUserDto,
  })
  async registerUser(@Body() registerDto: RegisterUserDto, @Res() response) {
    try {
      const checkUserExist = await this.userService.findUserByEmail(
        registerDto.email,
      );

      if (checkUserExist) {
        return response.status(400).json({
          message: 'Email Already Exist!',
          statusCode: 400,
        });
      }

      const hashPassword = await bcrypt.hash(
        registerDto.password,
        parseInt(process.env.SALT_HASH),
      );

      await this.userService.registerUser({
        ...registerDto,
        password: hashPassword,
      });

      return response.json({
        message: 'Register Succesfully',
        statusCode: 201,
      });
    } catch (error) {
      return response(error);
    }
  }
}
