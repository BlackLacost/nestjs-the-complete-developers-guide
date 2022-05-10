import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'

const messages: CreateMessageDto[] = []

@Controller('messages')
export class MessagesController {
  @Get()
  all() {
    return messages
  }

  @Post()
  create(@Body() input: CreateMessageDto) {
    messages.push(input)
    return input
  }

  @Get(':id')
  one(@Param('id') id: number) {
    return messages[id]
  }
}
