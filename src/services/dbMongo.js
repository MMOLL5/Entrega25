import { mongoose } from "mongoose";


const URL = 'mongodb://localhost:27017/ecommerce'

async () => {
    try {
        
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            UseUnifiedTopilogy: true
        })
        console.log('BD Conectada');

    } catch (error) {
        console.log(error);
    }
}