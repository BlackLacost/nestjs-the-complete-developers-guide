import { Controller, Get } from '@nestjs/common'

@Controller('app')
export class AppController {
  @Get('hi')
  hi() {
    return { message: 'hi there' }
  }

  @Get('bye')
  bye() {
    return { message: 'bye there' }
  }
}
