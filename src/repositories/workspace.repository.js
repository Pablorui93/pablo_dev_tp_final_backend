import pool from "../config/configMysql.config.js";
import Workspace from "../models/Workspace.model.js";


class WorkspaceRepository {
    //MongoDB
    static async create(name, url_image) {
        try {
            return await Workspace.create({
                name: name,
                url_image: url_image
            })
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo crear el workspace', error);
            throw error
        }
    }

    static async getById(workspace_id) {
        try {
            const workspace_found = await Workspace.findById(workspace_id)
            return workspace_found
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo eliminar el workspace con el id' + workspace_id, error);
            throw error
        }
    }

    static async getAll() {
        try {
            const worksapces = await Workspace.find({ active: true })
            return worksapces
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo obtener la lista de worksapces')
            throw error
        }
    }

    static async deleteById(workspace_id) {
        try {
            // Usamos deleteOne para ser explícitos en el filtro
            const result = await Workspace.deleteOne({ _id: workspace_id })
            // Mongoose devuelve { deletedCount: 1 } si se eliminó
            return result
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo actualizar el workspace', error)
            throw error
        }
    }

    static async updateById(worksapce_id, worksapce_update) {
        try {
            const update = await Workspace.findByIdAndUpdate(worksapce_id, worksapce_update)
            return update
        }
        catch (error) {
            console.error('[SERVER ERROR]: no se pudo actualizar el workspace', error)
            throw error
        }
    }
}


export default WorkspaceRepository
