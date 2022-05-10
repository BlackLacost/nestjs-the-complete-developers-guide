import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MessagesModule } from './messages/messages.module'

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule)
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )
  await app.listen(3000)
}
bootstrap()
