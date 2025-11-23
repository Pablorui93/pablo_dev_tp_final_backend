import express from 'express';
// Importamos los middlewares necesarios
import workspaceMiddleware from '../middlewares/workspaceMiddleware.js';
import channelMiddleware from '../middlewares/channelMiddleware.js';
// Importamos el controlador
import MessagesController from '../controllers/messages.controller.js';

const messageRouter = express.Router(); // Usando express.Router()

// 1. Middlewares de Pre-ruta
messageRouter.use(workspaceMiddleware()); // Verifica el acceso al Workspace
messageRouter.use(channelMiddleware);    // Verifica que el Channel exista en el Workspace

// 2. Rutas de Mensajes

// GET /messages
messageRouter.get(
    '/', 
    MessagesController.getAllByChannelId
);

// POST /messages
messageRouter.post(
    '/', 
    MessagesController.create
);

// DELETE /messages/:message_id
messageRouter.delete(
    '/:message_id', 
    MessagesController.delete
);

export default messageRouter;