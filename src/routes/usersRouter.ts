import express from 'express'; // Importa o framework Express.js
import usersController from '../controllers/users.controller'; // Importa o controlador de usuários

const router = express.Router(); // Cria um roteador para as rotas relacionadas a usuários

router.use(express.json()); // Usa o middleware para analisar corpos de requisição JSON

// Define a rota para obter todos os usuários e seus produtos associados
router.get('/users', usersController.getAllUsersAndTheirProducts);

export default router; // Exporta o roteador
