export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  keyId?: number;
}

type TOrderStatus = 'created' | 'pending' | 'done';

export interface IOrder {
  _id: string;
  ingredients: string[];
  status: TOrderStatus;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}
