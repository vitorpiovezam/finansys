import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: Category[] = [
            {
                id: 5,
                name: 'Lazer',
                description: 'Parque, cinema'
            },
            {
                id: 5,
                name: 'Lazer',
                description: 'Parque, cinema'
            },
            {
                id: 5,
                name: 'Lazer',
                description: 'Parque, cinema'
            },
            {
                id: 5,
                name: 'Lazer',
                description: 'Parque, cinema'
            }
        ];

        return categories ;
    }
}
