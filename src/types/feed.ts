export type TFeedOrder = {
  ingredients: string[],
  _id: string,
  status: 'created' | 'pending' | 'done' | 'canceled',
  number: number,
  createdAt: string,
  updatedAt: string,
}

export type TFeed = {
  success: boolean,
  orders: TFeedOrder[],
  total: number,
  totalToday: number
}
