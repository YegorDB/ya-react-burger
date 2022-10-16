export type FeedOrder = {
  ingredients: string[],
  _id: string,
  status: 'created' | 'pending' | 'done',
  number: number,
  createdAt: string,
  updatedAt: string,
}

export type Feed = {
  success: boolean,
  orders: FeedOrder[],
  total: number,
  totalToday: number
}
