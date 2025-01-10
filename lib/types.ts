export type productType = {
    id: number,
    name: string,
    category: string,
    price: number,
    discountedPrice: number,
    rating: number,
    image: string,
    description: string,
    reviews: productReviewType[],
}

export type productReviewType = {
    id: number,
    author: string, 
    rating: number,
    date: string, 
    content: string
}