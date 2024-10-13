import { Request, Response } from 'express'; // Importa os tipos Request e Response do Express
import usersService from '../services/users.service'; // Importa o serviço de usuários

// Controlador para obter todos os usuários e seus produtos associados
const getAllUsersAndTheirProducts = async (_req: Request, res: Response) => {
  // Chama o serviço para obter todos os usuários e seus produtos
  const usersAndProducts = await usersService.getUsersAndProducts();
  // Retorna os usuários e produtos em formato JSON com status 200 (OK)
  res.status(200).json(usersAndProducts);
};

// Exporta o controlador de obtenção de todos os usuários e seus produtos associados
export default {
  getAllUsersAndTheirProducts,
};
