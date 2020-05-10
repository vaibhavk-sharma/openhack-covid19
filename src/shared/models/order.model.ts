import { OrderStatus } from '../constants';

export class order{
    items: Items;
    status: OrderStatus;
    supplierId: string;
    residentId: string;
    totalBill: string;
};
export class Items{
    public name: string;
    public quantity: string;
    public baseUnit:['Kilos',"Numbers","Litres"];
    public pricePerUnit: string;
}