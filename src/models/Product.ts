type Product = {
  id: string;
  // imagem é obtida através de uma requisição separada
  name: string;
  description: string;
  value: number;
  quantity: number;
};

export type { Product };
