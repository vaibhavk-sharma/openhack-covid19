import { OrderStatus } from '../constants';

export class GetOrdersInput {
    status: OrderStatus
    supplierId: string;
    residentId: string;
}