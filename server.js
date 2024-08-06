import express, {urlencoded} from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateId } from './global.utility.js'
import multer from 'multer'
import { createTransport } from 'nodemailer'

export const app = express()
const PORT = 8080
const mailUser = 'aygupta9334@gmail.com'
const mailPassword = 'oqhlogjmcdmgmsst'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
// to parse the json object
app.use(express.json())

// to parse the form data
app.use(urlencoded({extended: true}))


const staticFilepath = path.join(__dirname, 'src')
// console.log(`staticFilepath: `,staticFilepath)
app.use(express.static(staticFilepath))


// set views folder path
app.set('views', path.resolve('src', 'views'));

// set view engine
app.set('view engine', 'ejs')

// to set the session
app.use(session({
    secret: generateId(4),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 100000,
    }
}))


// multer configuration for storing into the server application
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, 'public'))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})

export const upload = multer({ storage: storage })

// nodemailer configuration to send mail on applying to any job
const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: mailUser,
        pass: mailPassword,
    }
})

export async function sendMail(receiverMail) {
    const info = await transporter.sendMail({
        from: '"FindJob 🏛️" <aygupta9334@gmail.com>', // sender address
        to: receiverMail, // list of receivers
        subject: "Job Application", // Subject line
        text: "Applied successfully", // plain text body
        html: "<p><b>Thank You</b> for you interest, we'll notify you soon with the progress of your application.</p>", // html body
    })
}



export const startServer = () => {
    app.listen(PORT, () => {
        console.log(`application is running at http://localhost:${PORT}`);
    })
}



