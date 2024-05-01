import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleError } from '@/shared/http-error';
import { LoginDTO } from './dto/login.dto';
import { Public } from '@/shared/decorators/public.decorator';
import { PatientService } from '@/patient/patient.service';
import { SignupDto } from './dto/signup.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDTO) {
    try {
      return await this.userService.login(loginDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Public()
  @Post('signup')
  async create(@Body() signupDto: SignupDto) {
    try {
      const { patient, auth } = signupDto
      const newUser = await this.userService.create({
        ...auth, patient: {
          create: {
            ...patient
          }
        }
      })
      return newUser;
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
