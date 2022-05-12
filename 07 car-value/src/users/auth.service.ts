import { BadRequestException, Injectable } from '@nestjs/common'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import { UsersService } from './users.service'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email)
    if (user) {
      throw new BadRequestException('email in use')
    }

    const salt = randomBytes(8).toString('hex')
    const hash = (await scrypt(password, salt, 32)) as Buffer
    const result = `${salt}.${hash.toString('hex')}`

    return this.usersService.create(email, result)
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) {
      throw new BadRequestException('Email or password is not valid')
    }

    const [salt, storedHash] = user.password.split('.')

    const hash = (await scrypt(password, salt, 32)) as Buffer

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Email or password is not valid')
    }

    return user
  }
}
