import { Entry } from './pages/entries/shared/entry.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: Category[] = [
            {
                id: 1,
                name: 'Lazer',
                description: 'Parque, cinema'
            },
            {
                id: 2,
                name: 'Alimentação',
                description: 'Almoço, Pizza'
            },
            {
                id: 3,
                name: 'Saude',
                description: 'Consultas, exames, remédio'
            },
            {
                id: 4,
                name: 'Transporte',
                description: 'Onibus, combustivel, uber'
            },
            {
                id: 5,
                name: 'Casa',
                description: 'Supermercado, limpeza, manutenção'
            }
        ];

        const entries: Entry[] = [
            {
                id: 1,
                name: 'Gás de cozinha',
                description: 'Para fazer comida',
                type: 'Despesa',
                amount: '54,00',
                date: '21/04/2018',
                paid: 'Pago',
                categoryId: categories[4].id,
                category: categories[4]
            }
        ];

        return { categories, entries };
    }
}
