import ENVIRONMENT from "../config/environment.config.js"
import mailTransporter from "../config/mailTransporter.config.js"
import { ServerError } from "../error.js"
import MemberWorkspaceRepository from "../repositories/memberWorkspace.repository.js"
import UserRepository from "../repositories/user.repository.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"
import jwt from 'jsonwebtoken'
import ChannelRepository from "../repositories/channel.repository.js"

class WorkspaceService {
    static async getAll(user_id) {
        const members = await MemberWorkspaceRepository.getAllByUserId(user_id)
        return members
    }

    static async create(user_id, name, url_img) {

        //Crear el espacio de trabajo 
        const workspace_created = await WorkspaceRepository.create(name, url_img)

        //Crear al miembro con role de  admin (Creador del workspace)
        await MemberWorkspaceRepository.create(user_id, workspace_created._id, 'admin')

        await ChannelRepository.create(workspace_created._id, 'general')

        await ChannelRepository.create(workspace_created._id, name)

        return workspace_created
    }

    static async deleteById(workspace_id, user_id) {
        // En un escenario real, aquí se verificaría que el user_id sea el admin/creador
        
        // La eliminación de un Workspace implica:
        // 1. Eliminar todos los mensajes asociados (no implementado en este servicio, pero es la siguiente capa)
        // 2. Eliminar todos los canales asociados (no implementado aquí)
        // 3. Eliminar todos los miembros del workspace (no implementado aquí)

        // Por ahora, solo eliminamos el Workspace principal.
        // ADVERTENCIA: Esta eliminación DEJARÁ registros huérfanos de canales y miembros en la DB. 
        // Se recomienda hacer una eliminación en cascada en la capa de repositorio.
        const result = await WorkspaceRepository.deleteById(workspace_id)
        
        if (!result) {
            throw new ServerError(404, 'Workspace no encontrado o ya eliminado')
        }

        return result
    }

    static async invite(member, workspace_selected, email_invited, role_invited) {
        const user_invited = await UserRepository.getByEmail(email_invited)
        if (!user_invited) {
            throw new ServerError(404, 'No existe el usuario')
        }

        const already_member = await MemberWorkspaceRepository.getByUserIdAndWorkspaceId(user_invited._id, workspace_selected._id)

        if (already_member) {
            throw new ServerError(400, 'Usuario ya es un miembro de este workspace')
        }

        const invitation_token = jwt.sign(
            {
                id_invited: user_invited._id,
                id_inviter: member._id,
                id_workspace: workspace_selected._id,
                invited_role: role_invited
            },
            ENVIRONMENT.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        await mailTransporter.sendMail({
            to: email_invited,
            from: ENVIRONMENT.GMAIL_USER,
            subject: "Te han invitado a un espacio de trabajo",
            html: `
                        <h1>Has sido invitado al workspace: ${workspace_selected.name}</h1>
                        <a href="${ENVIRONMENT.URL_BACKEND}/api/member/confirm/${invitation_token}">Aceptar</a>
                        `
        })
    }

}


export default WorkspaceService