import Mongoose from 'mongoose';

const mensajesCollection = 'mensajes';

const MensajeSchema = new Mongoose.Schema({
    author: {
        email: { type: String, required: true, max: 50 },
        nombre: { type: String, required: true, max: 50 },
        apellido: { type: String, required: true, max: 50 },
        alias: { type: String, required: true, max: 50 },
        edad: { type: Number, required: true },
        avatar: { type: String, required: true, max: 50 },
      },
      time: { type: Date, required: true},
      text: { type: String, required: true, max: 1000 },
}) 

export const mensajes = Mongoose.model(mensajesCollection, MensajeSchema);