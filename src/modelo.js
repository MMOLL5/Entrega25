import { ProductosDB } from "./models/productos/DAOs/mongo";

export class Producto{
    
    constructor(title, price, thumbnail, id){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
    }

    /*Listado de Productos. Recibe un array y lo devuelve, capaz no tenga mucho sentido este método 
      pero la clase tiene la responsabilidad de devolver los datos*/
    listar(array){  
        ProductosDB.getAll().then((data) => {
            array = data;
            return array;
        });
        console.log('Responsabilidad de listar');  
    }

    /*Listado de Productos por ID. Recibe un array y un ID de producto, se recorre el array y se devuelve 
      el elemento que coincide con el ID o un objeto vacío*/
    listarItem(array, id){    
        
        let item = {};
        /*array.forEach(element => {
            if(element.id == id){
                item = element;
            }
        });*/

        return ProductosDB.get(id);
    }

    /*Agregado de objeto en el array. Recibe un array y toma los valores del constructor e incrementa el id
      de acuerdo a la longitud total del array al finalizar retorna el array completo*/
    guardar(array){
        
        let nuevoProducto = {        
            title : this.title,
            precio : this.price,
            thumbnail : this.thumbnail,
        };
        
        ProductosDB.add(nuevoProducto)
        .then((data) => console.log(data))
        .catch((err) => {
            console.log(err.message);
        });
    
        array.push(nuevoProducto);
        console.log('Responsabilidad de guardar');
        return array;
    }

    /*Modificación de objeto en el array. Recibe un array y parámetros con los valores a cambiar al finalizar 
    retorna el objeto modificado*/
    actualizar(array, nid, ntitle, nprice, nthumbnail){
        
        let actProducto = {        
            title : ntitle,
            price : nprice,
            thumbnail : nthumbnail,
            id : nid,
        };

        /*array.forEach(element => {
            if(element.id == nid){
               element.title = ntitle;
               element.price = nprice;
               element.thumbnail = nthumbnail; 
               
               
            }
        });     */
        
        const updatedData = {
            title: ntitle,
            precio: nprice,
            thumbnail: nthumbnail,
           };
         
        ProductosDB.update(nid, updatedData).then((data) => console.log(data));

        console.log('Responsabilidad de actualizar');
        return actProducto;

    }

    /*Borra un objeto en el array. Recibe un array y el id y lo elimina del array al finalizar retorna 
    el objeto borrado*/
    borrar(array, id){
        let pos;
        array.forEach((element, i) => {
            if(element.id == id){
                pos = i;
                console.log('POS ', pos);
            }
        });

        let borrItem = array.splice(pos, 1);

        ProductosDB.delete(id).then((data) => console.log(data));
        console.log('Responsabilidad de borrar');
        return borrItem;
    }
}    