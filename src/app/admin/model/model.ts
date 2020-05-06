export interface Product {
  id: string;
  productName: string;
  categoryName: string;
  description: string;
  imageUrl: string | File;
  price: string;
}

export interface USER {
  _id: string;
  firstname: string;
  lastname: string;
  mobile: number;
  email: string;
}

export interface Cart {
  id: string;
  status: string;
  createOn: Date;
  productId: string;
  uId: string;
  quantity: number;
  __v: number;
  UserCartList: [
    {
      id: string;
      outOfStock: boolean;
      productName: string;
      categoryName: string;
      description: string;
      imageUrl: string | File;
      price: number;
      __v: number;
    }
  ];
}
