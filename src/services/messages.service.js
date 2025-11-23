import MessagesChannelRepository from "../repositories/messageChannel.repository.js"

class MessageService {
    static async create(content, member_id, channel_id){
        const message_created = await MessagesChannelRepository.create(channel_id, member_id, content)
        const messages = await MessagesChannelRepository.getAllByChannelId(channel_id)
        return {
            messages: messages,
            message_created: message_created
        }
    }
    static async getAllByChannelId(channel_id){
        const messages = await MessagesChannelRepository.getAllByChannelId(channel_id)
        return {
            messages: messages
        }
    }

    static async deleteById(message_id, channel_id){
        // 1. Eliminar el mensaje
        await MessagesChannelRepository.deleteById(message_id)
        // 2. Obtener la lista actualizada de mensajes
        const messages = await MessagesChannelRepository.getAllByChannelId(channel_id)
        return {
            messages: messages
        }
    }

}

export default MessageService