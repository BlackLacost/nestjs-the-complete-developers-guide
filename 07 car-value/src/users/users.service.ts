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

  async create(email: string, password: string) {
    const user = this.userRepository.create({ email, password })
    return this.userRepository.save(user)
  }

  findOne(id: number) {
    if (!id) {
      return null
    }
    return this.userRepository.findOne(id)
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ email })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    Object.assign(user, updateUserDto)
    return this.userRepository.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return this.userRepository.remove(user)
  }
}
