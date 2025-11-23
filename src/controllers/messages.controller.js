import MessageService from "../services/messages.service.js"

class MessagesController {
    static async getAllByChannelId(request, response){
        try{    
            const {channel_selected, member} = request
            const {messages} = await MessageService.getAllByChannelId(channel_selected._id)
            response.status(200).json({
                ok: true,
                status: 200,
                message: "Messages",
                data: {
                    messages: messages
                },
            });
        }
        catch(error){
            if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL REGISTRAR', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }


    static async create(request, response){
        try{    
            const {channel_selected, member, user} = request
            const {content} = request.body
            //Crear un mensaje
            //(Para la clase que viene) Obtener la lista de mensajes y responder
            const {messages, message_created} = await MessageService.create(content, member._id, channel_selected._id)

            return response.status(201).json({
                ok: true,
                status: 201,
                message: "Messages created",
                data: {
                    messages: messages,
                    message_created: message_created
                },
            });
        }
        catch(error){
            if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL REGISTRAR', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }

    static async delete(request, response){
        try{    
            const { channel_selected } = request
            const { message_id } = request.params

            const {messages} = await MessageService.deleteById(message_id, channel_selected._id)

            return response.status(200).json({
                ok: true,
                status: 200,
                message: "Message deleted",
                data: {
                    messages: messages // Se devuelve la lista actualizada
                },
            });
        }
        catch(error){
            if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL ELIMINAR', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }

        static async deleteById(request, response){
        try{    
            const {channel_selected, member} = request
            // message_id viene de la ruta: /api/workspace/:workspace_id/channels/:channel_id/messages/:message_id
            const {message_id} = request.params 

            // 1. Eliminar el mensaje
            // Nota: Aquí se podría añadir lógica para verificar si el 'member' es el autor del mensaje.
            await MessageService.deleteById(message_id)

            // 2. Obtener la lista actualizada de mensajes
            const {messages} = await MessageService.getAllByChannelId(channel_selected._id)

            return response.status(200).json({
                ok: true,
                status: 200,
                message: "Message deleted",
                data: {
                    messages: messages,
                },
            });
        }
        catch(error){
            if(error.status){
                return response.status(error.status).json({
                    ok:false,
                    message: error.message,
                    status: error.status
                })
            }
            else{
                console.error(
                    'ERROR AL ELIMINAR MENSAJE', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }
}

export default MessagesController