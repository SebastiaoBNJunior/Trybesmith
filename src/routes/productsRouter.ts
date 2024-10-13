import express from 'express'; // Importa o framework Express.js
import productsController from '../controllers/products.controller'; // Importa o controlador de produtos
import nameMiddleware from '../middlewares/name.middleware'; // Importa o middleware de validação de nome
import priceMiddleware from '../middlewares/price.middleware'; // Importa o middleware de validação de preço

const router = express.Router(); // Cria um roteador para as rotas relacionadas a produtos

router.use(express.json()); // Usa o middleware para analisar corpos de requisição JSON

// Define a rota para obter todos os produtos
router.get('/products', productsController.getAllProductsController);

// Usa o middleware de validação de nome
router.use(nameMiddleware.nameValidator);

// Usa o middleware de validação de preço
router.use(priceMiddleware.userIdValidator);
router.use(priceMiddleware.firstPart);

// Define a rota para criar um novo produto
router.post('/products', productsController.createProductController);

export default router; // Exporta o roteador
