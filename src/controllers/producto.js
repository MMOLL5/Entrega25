import { Request, Response, NextFunction } from 'express';
import { ProductosDB } from '../models/productos/DAOs/mongo';

class Producto {

  async getProducts(req, res) {
    const { id } = req.params;
    const { nombre, precio } = req.query;
    if (id) {
      const result = await ProductosDB.get(id);
      if (!result.length)
        return res.status(404).json({
          data: 'objeto no encontrado',
        });

      return res.json({
        data: result,
      });
    }

    res.json({
      data: await ProductosDB.get(),
    });
  }

  async addProducts(req, res) {
    const newItem = await productsAPI.addProduct(req.body);

    res.json({
      msg: 'producto agregado con exito',
      data: newItem,
    });
  }

  async updateProducts(req, res) {
    const id = req.params.id;

    const updatedItem = await productsAPI.updateProduct(id, req.body);

    res.json({
      msg: 'actualizando producto',
      data: updatedItem,
    });
  }

  async deleteProducts(req, res) {
    const id = req.params.id;
    await productsAPI.deleteProduct(id);
    res.json({
      msg: 'producto borrado',
    });
  }
  }

export const productsController = new Producto();