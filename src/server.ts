import app from './app'; // Importa o aplicativo Express

const PORT = 3001; // Define a porta em que o servidor irá escutar

// Inicia o servidor Express na porta especificada
const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

export default server; // Exporta o servidor Express
