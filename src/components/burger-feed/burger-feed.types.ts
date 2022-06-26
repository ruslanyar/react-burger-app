type TOrderStatus = 'created' | 'pending' | 'done';

export interface IBurgerFeedOrder {
  ingredients: string[];
  _id: string;
  status: TOrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export type TOrdersNumbers = number[] | null;
