import { readFile, writeFile } from 'fs/promises'

export interface Messages {
  [key: string]: {
    id: number
    content: string
  }
}

// @Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const content = await readFile('messages.json', 'utf-8')
    const messages: Messages = JSON.parse(content)
    return messages[id]
  }

  async findAll() {
    const content = await readFile('messages.json', 'utf-8')
    const messages: Messages = JSON.parse(content)
    return messages
  }

  async create(content: string) {
    const data = await readFile('messages.json', 'utf-8')
    const messages: Messages = JSON.parse(data)

    const ids = Object.keys(messages).map(Number)
    const id = ids.length > 0 ? Math.max(...ids) + 1 : 1
    messages[id] = { id, content }
    await writeFile('messages.json', JSON.stringify(messages, null, 2))
    return messages[id]
  }
}
