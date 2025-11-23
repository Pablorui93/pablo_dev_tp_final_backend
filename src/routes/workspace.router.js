import express from 'express'
import WorkspaceRepository from '../repositories/workspace.repository.js'
import WorkspaceController from '../controllers/workspace.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import workspaceMiddleware from '../middlewares/workspaceMiddleware.js'
import ChannelController from '../controllers/channel.controller.js'
import channelMiddleware from '../middlewares/channelMiddleware.js'
import MessagesController from '../controllers/messages.controller.js'

const workspaceRouter = express.Router()


workspaceRouter.get(
    '/',
    authMiddleware,
    WorkspaceController.getAll
)


workspaceRouter.post(
    '/',
    authMiddleware,
    WorkspaceController.create
)



workspaceRouter.get(
    '/:workspace_id/channels',
    authMiddleware,
    workspaceMiddleware(),
    WorkspaceController.getById
)

workspaceRouter.post(
    '/:workspace_id/channels',
    authMiddleware,
    workspaceMiddleware(['admin']), // => Solo miembros con rol de administrador pueden crear canales
    ChannelController.create
)



//Crear mensajes
workspaceRouter.post(
    '/:workspace_id/channels/:channel_id/messages',
    authMiddleware,
    workspaceMiddleware(),
    channelMiddleware,
    MessagesController.create
)
//Obtener mensajes
workspaceRouter.get(
    '/:workspace_id/channels/:channel_id/messages',
    authMiddleware,
    workspaceMiddleware(),
    channelMiddleware,
    MessagesController.getAllByChannelId
)


workspaceRouter.get(
    '/:workspace_id/test',
    authMiddleware,
    workspaceMiddleware(),
    (request, response) => {
        console.log(request.workspace_selected)
        console.log(request.member)
        response.json({
            ok: true,
            status: 200,
            message: 'test'
        })
    }
)


workspaceRouter.post(
    '/:workspace_id/invite', 
    authMiddleware, 
    workspaceMiddleware(['admin']), 
    WorkspaceController.invite
)

workspaceRouter.delete(
    '/:workspace_id/channels/:channel_id/messages/:message_id', // El parámetro :message_id es crucial
    authMiddleware, // Requiere autenticación
    workspaceMiddleware(), // Verifica acceso al workspace
    channelMiddleware, // Verifica que el canal exista y pertenezca
    MessagesController.delete // Llama al nuevo método del Controller
)

workspaceRouter.delete(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware(['admin']), // Solo el admin puede eliminar el workspace
    WorkspaceController.delete
)

workspaceRouter.delete(
    '/:workspace_id/channels/:channel_id',
    authMiddleware,
    workspaceMiddleware(['admin']), // Solo admin debería eliminar canales, o el creador
    channelMiddleware, // Asegura que el canal exista en el workspace
    ChannelController.delete // Controlador que maneja la eliminación en cascada
)

export default workspaceRouter