import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepo } from './user.repo';
import * as bcrypt from "bcrypt";
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo, private jwtService: JwtService) {

  }

  async login(loginDto: LoginDTO) {
    try {
      const errInvalidCredentials = 'Invalid username or password';
      const user = await this.userRepo.getByUsername(loginDto.username);
      if (!user) {
        throw new UnauthorizedException(errInvalidCredentials);
      }

      const validPass = await bcrypt.compare(loginDto.password, user.password);
      if (!validPass) {
        throw new UnauthorizedException(errInvalidCredentials);
      }
      const token = await this.jwtService.signAsync({
        sub: user.id,
      });
      delete user.password;
      return { token, user };
    } catch (error) {
      throw error
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.hashPassword(createUserDto.password)
      const newUser = await this.userRepo.create(createUserDto)
      delete newUser.password
      return newUser
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.userRepo.getAll()
      users.map(user => delete user.password)
      return users
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepo.getByID(id)
      delete user.password
      return user
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepo.update(id, updateUserDto)
      delete user.password
      return user
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.userRepo.delete(id)
      return { message: "Deleted successfully" }
    } catch (error) {
      throw error;
    }
  }

  private hashPassword = async (password: string) => {
    //hash password using bcrypt package
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password

  }

}
