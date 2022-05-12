import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common'
import { Serialize } from '../common/interceptors/serialize.interceptor'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { ResponseUserDto } from './dto/response-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from './guards/auth.guard'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Controller('auth')
@Serialize(ResponseUserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const { email, password } = createUserDto
    const user = await this.authService.signup(email, password)
    session.userId = user.id
    return user
  }

  @Post('signin')
  async signin(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const { email, password } = createUserDto
    const user = await this.authService.signin(email, password)
    session.userId = user.id
    return user
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null
  }

  // @Get('/whoami')
  // whoAmi(@Session() session: any) {
  //   return this.usersService.findOne(session.userId)
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmi(@CurrentUser() user: User) {
    return user
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id))
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return user
  }

  @Get()
  async findUserByEmail(@Query('email') email: string) {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`)
    }
    return user
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(parseInt(id), updateUserDto)
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }
}
