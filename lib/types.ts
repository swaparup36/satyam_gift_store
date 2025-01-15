export type productType = {
    id?: string,
    name: string,
    category: string,
    price: number,
    discountedPrice: number,
    rating: number,
    image: string,
    description: string,
    instock: boolean,
    reviews: productReviewType[],
}

export type productReviewType = {
    id?: string,
    author: string, 
    rating: number,
    date: string, 
    content: string,
    productId: string;
}