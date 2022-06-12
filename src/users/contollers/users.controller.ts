import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dto/user.login';

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

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiBody({
    description: 'This body payload login User',
    type: LoginUserDto,
  })
  async loginUser(@Body() userLoginDto: LoginUserDto, @Res() response) {
    try {
      const { email, password } = userLoginDto;

      const checkUserExist = await this.userService.findUserByEmail(email);

      const comparePassword = await bcrypt.compare(
        password,
        checkUserExist.password,
      );

      if (!checkUserExist) {
        return response.status(400).json({
          message: 'Unregistered Email!',
          statusCode: 400,
        });
      }

      if (!comparePassword) {
        return response.status(400).json({
          message: 'Invalid Password',
          statusCode: 400,
        });
      }

      return response.json({
        message: 'Wkwkwkwkw',
      });
    } catch (error) {
      return response.json(error);
    }
  }
}
