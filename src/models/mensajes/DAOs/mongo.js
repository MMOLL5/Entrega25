import mongoose from 'mongoose';
import * as model from '../mensajes';
import { normalize, schema, denormalized } from 'normalizr';
import util from 'util';


const URL = 'mongodb://localhost:27017/ecommerce'

const author = new schema.Entity('author', {}, { idAttribute: 'email' });

const msge = new schema.Entity(
  'mensajes',
  {
    author: author,
  },
  { idAttribute: '_id' }
);

const msgesSchema = new schema.Array(msge);

class MensajesPersistencia {
  async add(data) {
    try {
        
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            UseUnifiedTopology: true
        })
        console.log('BD Conectada');

        const mensajeSaveModel = new model.mensajes(data);
        let mensajeSave = await mensajeSaveModel.save();
        return mensajeSave;
    } catch (error) {
        console.log(error);
    }
  }

  async getAllMessages(){
    try {
      let messages = (await model.mensajes.find()).map((aMsg) => ({
        _id: aMsg._id,
        author: aMsg.author,
        time: aMsg.time,
        text: aMsg.text,
      }));
      //console.log('messages ', messages);
      //console.log('Length sin norm', JSON.stringify(messages).length);
      let normalizedMessages = normalize(messages, msgesSchema);
      //console.log('normalizedMessages ', normalizedMessages);
      console.log('Length norm', JSON.stringify(normalizedMessages).length);
      let denormalizedMessages = normalize(messages, msgesSchema);
      //console.log('denormalizedMessages ', denormalizedMessages);
      console.log('Length denorm', JSON.stringify(denormalizedMessages).length);
      let comp = 1 - (JSON.stringify(normalizedMessages).length/JSON.stringify(denormalizedMessages).length);
      console.log('Compresión', comp);
      return normalizedMessages;
    } catch (err) {
      console.log('ERROR');
      console.log(err);
    }
  };

}

export const Mensajes = new MensajesPersistencia();