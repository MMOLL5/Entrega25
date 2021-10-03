import express from 'express';
import {Router} from 'express';
import {Recurso1Controller} from '../controllers/recurso1';

const router1 = express.Router();

router1.post('/generar', Recurso1Controller.generar);

router1.get('/:id?', Recurso1Controller.leer)

router1.get('/', (req, res) => {

    productos = Recurso1Controller.leer();

    const cantidad = productos.length;

    let existe;
    if (cantidad > 0)
         existe = true;
    else
        existe = false;   

    const datosProductos = {
    nombre:'Productos',
    hayProductos: existe,
    listaProductos: productos};

    res.render('vistaTest', datosProductos);
});

export default router1;