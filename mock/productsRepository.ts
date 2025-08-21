import { IProduct } from "@/@types";

export class ProductRepository implements ProductRepository {
  products = <IProduct[]>[
    {
      title: "Arroz Alimo",
      code: "73011100",
      price: 5000,
      shop: "Kero",
      image: "",
    },
    {
      title: "Massa Alimo",
      code: "33111100",
      price: 3000,
      shop: "Candando",
      image: "",
    },
    {
      title: "Feijão Alimo",
      code: "9111100",
      price: 3000,
      shop: "AngoMart",
      image: "",
    },
    {
      title: "Óleo de palma",
      code: "34111100",
      price: 9000,
      shop: "Arreiou",
      image: "",
    },
    {
      title: "Arroz Alimo",
      code: "73011100",
      price: 4800,
      shop: "Candando",
      image: "",
    },
    {
      title: "Arroz Alimo",
      code: "73011100",
      price: 5150,
      shop: "AngoMart",
      image: "",
    },
    {
      title: "Óleo de palma",
      code: "34111100",
      price: 3000,
      shop: "Kero",
      image: "",
    },
    {
      title: "Agua Mineral",
      code: "253111100",
      price: 900,
      shop: "Arreiou",
      image: "",
    },
    {
      title: "Agua Mineral",
      code: "253111100",
      price: 800,
      shop: "Kero",
      image: "",
    },
    {
      title: "Agua Mineral",
      code: "253111100",
      price: 700,
      shop: "KIbabo",
      image: "",
    },
    {
      title: "Lapis",
      code: "2231144",
      price: 900,
      shop: "Arreiou",
      image: "",
    },
    {
      title: "Lapis",
      code: "2231144",
      price: 700,
      shop: "Kibabo",
      image: "",
    },
    {
      title: "Caderno",
      code: "2235144",
      price: 1000,
      shop: "Arreiou",
      image: "",
    },
    {
      title: "Livro de Matematica",
      code: "2289144",
      price: 2000,
      shop: "Candando",
      image: "",
    },
    {
      title: "Calculadora",
      code: "28796544",
      price: 1000,
      shop: "Buitanda",
      image: "",
    },
    {
      title: "Calculadora",
      code: "28796544",
      price: 1000,
      shop: "Kero",
      image: "",
    },
    {
      title: "Calculadora",
      code: "28796544",
      price: 1000,
      shop: "Ilha shop",
      image: "",
    },
    {
      title: "Calculadora",
      code: "28796544",
      price: 1000,
      shop: "Talatona shopping",
      image: "",
    },
    {
      title: "Calculadora",
      code: "28796544",
      price: 1000,
      shop: "Belas",
      image: "",
    },
    {
      title: "Calculadora",
      code: "28796544",
      price: 1000,
      shop: "Fresco",
      image: "",
    },
    {
      title: "Calculadora",
      code: "28796544",
      price: 1000,
      shop: "Alimenta Angola",
      image: "",
    },
    {
      title: "Calculadora",
      code: "28796544",
      price: 1000,
      shop: "Angomart",
      image: "",
    },
  ];

  get = (): IProduct[] => {
    return this.products;
  };

  add = (newProduct: IProduct) => {
    this.products = [newProduct, ...this.products];
  };

  edit = (editedProduct: IProduct) => {
    const index = this.products.findIndex(
      (p) => p.code === editedProduct.code && p.shop === editedProduct.shop
    );
    if (index !== -1) {
      this.products[index] = editedProduct;
    }
  };
}

export const productRepository = new ProductRepository();
