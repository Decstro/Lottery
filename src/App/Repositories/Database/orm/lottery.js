import { Model } from 'objection';

export class Lottery extends Model {
    id: number;
    winning_combination: string;
    isRematch: boolean;
    date: string;

    static get tableName() {
        return 'lotteries';
    }

    static get idColumn() {
        return 'id';
    }
}