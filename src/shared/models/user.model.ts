export class User {
    public firstName: string;
    public lastName?: string;
    public email: string;
    public address: Address;
    public phoneNumber: string;
    public type: "Supplier" | "Resident";
    public subType?: "Grocery" | "ServiceProvider" | "Vegetables";
    public communityId?: any;
    public isAdmin: boolean;
    public isUserVerified: boolean;
}

export class Address {
    public street: string;
    public city: string;
    public state: string;
    public pinCode: string;
}

export class NativeUserStorageInfo{
    public email: string;
    public displayName: string;
    public idToken: string;
    public type: string;
}