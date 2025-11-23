import ChannelRepository from "../repositories/channel.repository.js";

class ChannelService {
    static async getAllByWorkspaceId (workspace_id){
        return await ChannelRepository.getAllByWorkspaceId(workspace_id)
    }

    static async create (workspace_id, name){
        await ChannelRepository.create( workspace_id, name)
        return await ChannelRepository.getAllByWorkspaceId(workspace_id)
    }

        static async deleteChannel(channel_id) {
        // En un entorno real, aquí se verificaría el rol del miembro.
        
        // 1. Eliminar todos los mensajes asociados a ese canal
        await MessagesChannelRepository.deleteAllByChannelId(channel_id);

        // 2. Eliminar el canal principal
        const result = await ChannelRepository.deleteById(channel_id);

        if (!result) {
            throw new ServerError(404, 'Canal no encontrado o no se pudo eliminar');
        }
        return result;
    }
}


export default ChannelService