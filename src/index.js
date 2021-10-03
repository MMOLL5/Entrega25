/*Imports*/
import express, { request, response } from 'express';
import path from 'path';
import * as http from 'http';
import io from 'socket.io';
import {Producto} from './modelo';
import { initWsServer } from './services/socket';
import { productsController } from './controllers/producto';
import recurso1Router from './routes/recurso1';
import apiRouter from './routes/apiRouter';
import logOutRouter from './routes/logout';
import logInRouter from './routes/login';
import session from 'express-session';
import { render } from 'pug';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import Config from './config/index'

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const tenMinute = 10000 * 60;

const StoreOptions = {
  /* ----------------------------------------------------- */
  /*           Persistencia por redis database             */
  /* ----------------------------------------------------- */
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`,
    mongoOptions: advancedOptions,
  }),
  /* ----------------------------------------------------- */

  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false  ,
  cookie: {
      maxAge: tenMinute
  } ,
};

/*Declaración puerto y app*/
const puerto = 8080;
const app = express();

app.use(cookieParser());
app.use(session(StoreOptions));

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

const layoutFolderPath = path.resolve(__dirname, '../views/layouts'); 
const defaultLayerPath = path.resolve(__dirname, '../views/layouts/index.handlebars');

const appServer = http.Server(app);

const appWSServer = initWsServer(appServer);

appServer.listen(puerto, () => console.log('Server UP en puerto', puerto));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**/
app.use('/api',apiRouter);

/*Route Login*/
app.use('/login',logInRouter);

/*Route LogOut*/
app.use('/logout',logOutRouter);

const validateLogIn = (req, res, next) => {
  if (req.session.loggedIn) next();
  else res.status(401).json({ msg: 'no estas autorizado' });
};

app.get('/secret-endpoint', validateLogIn, (req, res) => {
  req.session.contador++;
  res.json({
    msg: 'informacion super secreta',
    contador: req.session.contador,
  });
});

/*Route test-view*/
app.use('/vista-test',recurso1Router);

/*Desde Acá router*/
/*Declaración de producto para manejo del array de producto en memoria y creación de instancia 
de la clase Producto importada del módulo*/
let productos = [];
let prod = new Producto();

/*Listado general de productos*/
app.get('/listar', productsController.getProducts);/*(req, res) => {


/*Listado general de productos por ID*/
app.get('/listar/:id', productsController.getProducts);/*(req, res) => {


/*Inserción de nuevo objeto en array productos*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.post('/guardar/', (req, res) => {
    
    const body = req.body;

    let price = 0;

    price = parseFloat(body.price);

    if(
        !body.title ||
        !body.thumbnail ||
        typeof body.title != 'string' ||
        typeof body.thumbnail != 'string' ||
        typeof price != 'number'
        ){
            return res.status(400).json({
                msg: 'Se necesitan los datos title, thumbnail y price',
            });
        }
    
    const prod = new Producto(body.title, price, body.thumbnail, productos.length);

    productos = prod.guardar(productos);

    res.status =201;
    res.json({
        data: productos[productos.length-1],
    })
});

/*Actualización de un objeto en array productos*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.put('/actualizar/:id', (req, res) => {
    
    const body = req.body;

    console.log(req.body);

    const actItem = prod.actualizar(productos, req.params.id, body.title, body.precio, body.thumbnail);
    
    res.status =200;
    res.json({
        actItem,
    })

});

/*Borrado de un objeto en array productos*/
app.delete('/borrar/:id', (req, res) => {
    
    const borrItem = prod.borrar(productos, req.params.id);

    res.status =200;
    res.json({
        borrItem,
    })

});

/*Vista de productos*/
app.get('/vista', (req, res) => {

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

    res.render('vistaPug', datosProductos);
});

app.get('/', (req, res) => {
  if (req.session.contador) res.render('altaPug');
    else res.redirect('/login');
});


let messages = [];

appWSServer.on('connection', function (socket) {
    console.log('\n\nUn cliente se ha conectado');
    console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
    console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);
  
    socket.on('new-message', function (data) {
     // console.log('Datos in', data);
      const prod = new Producto(data.tit, data.pri, data.thu, productos.length);
      productos = prod.guardar(productos);

      //console.log('data', data);
      const newMessage = {
        socketId: socket.client.id,
        message: data,
      };

      messages.push(data);

      //console.log('messages', messages);
  
      //PARA RESPONDERLE A UN SOLO CLIENTE
      // socket.emit('messages', messages);
  
      //PARA ENVIARLE EL MENSAJE A TODOS
      appWSServer.emit('messages', messages);
  
      //PARA ENVIARLE MENSAJE A TODOS MENOS AL QUE ME LO MANDO
      // socket.broadcast.emit('messages', messages);
    });
  
    socket.on('askData', (data) => {
      console.log('ME LLEGO DATA', data);
      const obj = {
        tit: "Nombre",
        pri: "Precio",
        thu: "Foto"};

      if (messages.length==0){
        messages.push(obj);  
      };
      socket.emit('messages', messages);
    });
  });