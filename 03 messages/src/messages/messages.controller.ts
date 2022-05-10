import { Controller, Get, Post } from '@nestjs/common'

@Controller('messages')
export class MessagesController {
  @Get()
  all() {}

  @Post()
  create() {}

  @Get(':id')
  one() {}
}
