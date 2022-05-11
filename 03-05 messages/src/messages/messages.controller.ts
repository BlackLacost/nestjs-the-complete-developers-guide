import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  getMessages() {
    return this.messagesService.findAll()
  }

  @Post()
  createMessage(@Body() input: CreateMessageDto) {
    return this.messagesService.create(input.content)
  }

  @Get(':id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id)

    if (!message)
      throw new NotFoundException(`message with id: ${id} not found`)

    return message
  }
}
