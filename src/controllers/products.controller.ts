import { Request, Response } from 'express'; // Importa os tipos Request e Response do Express
import productsService from '../services/products.service'; // Importa o serviço de produtos
import { Product } from '../types/Product'; // Importa o tipo Product

// Controlador para criar um novo produto
const createProductController = async (req: Request, res: Response): Promise<Response> => {
  const product: Product = req.body; // Extrai o produto do corpo da requisição
  const result = await productsService.createProduct(product); // Chama o serviço para criar o produto
  return res.status(201).json(result); // Retorna o resultado com status 201 (Created)
};

// Controlador para obter todos os produtos
const getAllProductsController = async (_req: Request, res: Response): Promise<Response> => {
  const result = await productsService.getAllProducts(); // Chama o serviço para obter todos os produtos
  return res.status(200).json(result); // Retorna o resultado com status 200 (OK)
};

// Exporta os controladores de criação e obtenção de produtos
export default { createProductController, getAllProductsController };
