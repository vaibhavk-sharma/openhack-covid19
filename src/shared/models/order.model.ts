import { OrderStatus } from '../constants';

export class Order{
    items: Items[];
    status: OrderStatus;
    supplierId: string;
    residentId: string;
    totalBill: string;
};
export class Items{
    public name: string;
    public quantity: number;
    public baseUnit:['Kilos',"Numbers","Litres"];
    public pricePerUnit: string;
}
