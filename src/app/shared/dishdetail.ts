export class Dishes{
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    description: string;
    comments: {
        rating: number;
        comment: string;
        author: string;
        date: string;
    }[]
    
}