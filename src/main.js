import ENVIRONMENT from "./config/environment.config.js";
import connectToMongoDB from "./config/configMongoDB.config.js";
import express from 'express'
import authRouter from "./routes/auth.router.js";
import workspaceRouter from "./routes/workspace.router.js";
import cors from 'cors'
import memberRouter from "./routes/member.router.js";
import MessagesChannelRepository from "./repositories/messageChannel.repository.js";
import ChannelRepository from "./repositories/channel.repository.js";
import UserRepository from "./repositories/user.repository.js";
import WorkspaceRepository from "./repositories/workspace.repository.js";
import MemberWorkspaceRepository from "./repositories/memberWorkspace.repository.js";


connectToMongoDB()

const app = express()

//Configuro a mi API como API publica, cualquier dominio puede hacer peticiones
app.use( cors() )


app.use(express.json())

//Todas las consultas que empiezen con /api/auth va a ser gestionadas por el authRouter
app.use('/api/auth', authRouter)
app.use('/api/workspace', workspaceRouter)
app.use('/api/member', memberRouter)
app.use('/api/test', (req, res) => {
    res.json({
        ok: true,
        message: 'Todo ok'
    })
})

/* mailTransporter.sendMail(
    {
        from: ENVIRONMENT.GMAIL_USER, //Desde quien
        to:  'mati.dev.gimenez@gmail.com', //Hacia adonde enviar
        subject: 'Mail de prueba', //asunto
        html: `<h1>Hola desde node js</h1>` //Body del mail
    }
) */


app.listen(
    ENVIRONMENT.PORT || 8080,
    () => {
        console.log(`Tu servidor se esta ejecutando correctamente en el puerto ${ENVIRONMENT.PORT}`)
    }
)

/* ChannelRepository.getAllByWorkspaceId() */


/* MessagesChannelRepository.create(
    "69021f8d1f59e8d52c3e60f8",
    "68f8d8cc6968605f86bc6c90",
    'hola'
) */
/* MessagesChannelRepository.getAllByChannelId("69021f8d1f59e8d52c3e60f8").then(
    (messages) => console.log(messages[0])
) */


// WorkspaceRepository.create('Prueba', 'https://www.google.com.ar/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png'
// )

// WorkspaceRepository.create('Prueba 2', 'https://www.google.com.ar/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png'
// )

// ChannelRepository.create('691c5880ae1c3f5415d4bced', 'Prueba')
// )
//MessagesChannelRepository.create('691ddcb3568c6c7ac519f1dd', '691dc2abdd18db53816d9a22', 'hola soy el primer mensaje de este canal!!!')
//MessagesChannelRepository.create('691ddcb3568c6c7ac519f1dd', '691dc2abdd18db53816d9a22', 'hola soy el segundo mensaje de este canal!!!')
//MemberWorkspaceRepository.create('691dc17e8ff143fc7bf0a3e3', '691c5880ae1c3f5415d4bced', 'admin')
// ChannelRepository.create('69021f8d1f59e8d52c3e60f8', 'Prueba 3')
//MemberWorkspaceRepository.create('691dc17e8ff143fc7bf0a3e3', '691c5880ae1c3f5415d4bcee', 'admin')