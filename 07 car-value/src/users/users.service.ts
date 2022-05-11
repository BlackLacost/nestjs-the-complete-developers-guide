import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const user = this.userRepository.create({ email, password })
    return this.userRepository.save(user)
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return user
  }

  async find(email: string) {
    const users = await this.userRepository.find({ email })
    if (users.length === 0) {
      throw new NotFoundException(`Users with email: ${email} not found`)
    }
    return users
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    Object.assign(user, updateUserDto)
    return this.userRepository.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    return this.userRepository.remove(user)
  }
}
