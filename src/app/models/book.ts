export interface Book {
    id: string,
    title: string,
    author: string,
    isbn: string,
    publisher: string,
    published: number,
    description: string,
    imageUrl: string,
    totalRating: number,
    averageRating: number,
    ratingCtr: number,
    reviewCtr: number,
    genres: string
}