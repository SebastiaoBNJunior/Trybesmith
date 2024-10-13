import express from 'express'; // Importa o framework Express.js
import loginController from '../controllers/login.controller'; // Importa o controlador de login

const loginRouter = express.Router(); // Cria um roteador para as rotas relacionadas ao login

loginRouter.use(express.json()); // Usa o middleware para analisar corpos de requisição JSON

// Rota para lidar com requisições de login
loginRouter.post('/login', loginController.loginController);

export default loginRouter; // Exporta o roteador de login
