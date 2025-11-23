import ChannelService from "../services/channel.service.js";

class ChannelController {
    static async create(request, response) {
        try {
            const { workspace_selected } = request;
            const { name } = request.body;
            // Validar nombre de canal ok
            if (!name) {
                return response.status(400).json({
                    ok: false,
                    message: 'El nombre del canal es requerido',
                });
            }
            // Crear el canal usando .createChannel
            const channel_list = await ChannelService.create(workspace_selected.id, name);
            response.status(201).json({
                ok: true,
                message: 'Canal creado',
                status: 201,
                data: {
                    channels: channel_list
                }
            });
        } catch (error) {
            console.error('Error al crear:', error);
            response.status(500).json({
                ok: false,
                message: 'Error interno del servidor',
            });
        }
    }

        static async delete(request, response) {
        try {
            // El canal ya está cargado y verificado en el middleware (request.channel_selected)
            const { channel_selected, workspace_selected } = request;
            const channel_id = channel_selected._id;

            // 1. Eliminar el canal en cascada
            await ChannelService.deleteChannel(channel_id);

            // 2. Devolver la lista actualizada (llamando al servicio GET)
            const channels = await ChannelService.getAllByWorkspaceId(workspace_selected._id);

            response.status(200).json({
                ok: true,
                status: 200,
                message: "Canal eliminado exitosamente",
                data: {
                    channels: channels, // Devolvemos la lista para la recarga del frontend
                    deletedId: channel_id
                }
            });

        } catch (error) {
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                });
            } else {
                console.error('ERROR AL ELIMINAR CANAL:', error);
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor al eliminar canal',
                    status: 500
                });
            }
        }
    }

}


export default ChannelController