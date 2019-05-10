import { BaseResourceModel } from 'src/app/shared/models/base-resource-model';
import { Category } from './../../categories/shared/category.model';

export class Entry extends BaseResourceModel {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: string,
        public categoryId?: number,
        public category?: Category,
    ) {
        super();
        this.id = id;
        this.name = name;
        this.description = description,
        this.type = type;
        this.amount = amount;
        this.date = date;
        this.paid = paid;
        this.categoryId = categoryId;
        this.category = category;
    }

    static types = {
        expense: 'Despesa',
        revenue: 'Receita'
    };

    // get paidText(): string {
    //     return this.paid ? 'Pago' : 'Pendente';
    // }
}
