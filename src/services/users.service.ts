import ProductModel from '../database/models/product.model'; // Importa o modelo de produto do banco de dados
import UserModel from '../database/models/user.model'; // Importa o modelo de usuário do banco de dados
import { LesserUser } from '../types/User'; // Importa o tipo de usuário

// Função assíncrona para obter todos os usuários e seus produtos associados
const getUsersAndProducts = async (): Promise<LesserUser[]> => {
  // Busca todos os usuários no banco de dados
  const everyUser = await UserModel.findAll();
  // Busca todos os produtos no banco de dados
  const everyProduct = await ProductModel.findAll();

  // Mapeia todos os usuários para extrair seus nomes de usuário e IDs de produtos associados
  const results = everyUser.map((userEl) => {
    // Filtra os produtos para encontrar aqueles associados ao usuário atual
    const itemIds = everyProduct
      .filter((product) => product.dataValues.userId === userEl.dataValues.id)
      .map((product) => product.dataValues.id); // Mapeia os IDs dos produtos
    // Retorna um objeto contendo o nome de usuário e os IDs dos produtos associados
    return {
      username: userEl.dataValues.username,
      productIds: itemIds,
    };
  });

  return results; // Retorna os resultados
};

// Exporta a função para obter todos os usuários e seus produtos associados
export default {
  getUsersAndProducts,
};
