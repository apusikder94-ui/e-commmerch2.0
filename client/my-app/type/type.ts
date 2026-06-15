export interface IUser {
  name?: string;
  email: string;
  profilePic?: string;
  role?: string;
}

export interface ISignUpResponse {
  success: boolean;
  message: string;
  user: IUser;
}
export interface ISignInResponse {
  success: boolean;
  message: string;
  user: IUser;
}

export interface ISignUpRequest {
  name?: string;
  email: string;
  password: string;
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ICategory {
  name: string;
  catImg: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export interface ICreateCategoryResponse {
  success: boolean;
  message: string;
  category: ICategory;
}
export interface IGetCategoryResponse {
  success: boolean;
  message: string;
  category: ICategory[];
}
export interface IUpdateCategoryResponse {
  success: boolean;
  message: string;
  category: ICategory;
}
export interface IDeleteCategoryResponse {
  success: boolean;
  message: string;
}

export interface IProduct {
  name: string;
  description: string;
  categoryId: string | ICategory;
  images: string[];
  price: string;
  discountPrice: string;
  stock: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export interface ICreateProductResponse {
  success: boolean;
  message: string;
  product: IProduct;
}

export interface IGetProductResponse {
  success: boolean;
  message: string;
  product: IProduct[];
}
