import express from 'express'
import { } from 'dotenv/config'
import sendgrid from '@sendgrid/mail'
import cors from 'cors'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://www.romacoffeetea.com',
    'https://romacoffeetea.com',
  ],

  //credentials: true,
  optionsSuccessStatus: 200,
  credentials: true,
}
const app = express()

const port = process.env.PORT
app.use(cors(corsOptions))
app.use(express.json())

app.post("/franchise", async (req, res) => {
    const { fullName, email, phone, town, district, message } = req.body
     var msg = {
       to: 'romacoffeetea37@gmail.com',
       from: process.env.EMAIL,
       subject: 'Franchising Talebi',
       text: `Ad Soyad:${fullName}.\r\n\ Email:${email}.\r\n\ Telefon:${phone}.\r\n\ il:${town}.\r\n\ ilçe:${district}\r\n\ Mesaj: ${message}`,
       html: `<ul>
         <li>Ad Soyad:${fullName}</li>
         <li>Email:${email}</li>
         <li>Telefon:${phone}</li>
         <li>il:${town}</li>
         <li>ilçe:${district}</li>
         <li>Mesaj: ${message}</li>
       </ul>`,
     }
    sendgrid.send(msg)
     return  res.send({msg: 'Göderildi'})
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})