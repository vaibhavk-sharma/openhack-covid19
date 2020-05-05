export class User {
    public firstName: string;
    public lastName?: string;
    public email: string;
    public address: string;
    public phoneNumber: string;
    public type: "Supplier" | "Resident";
    public subType?: "Grocery" | "ServiceProvider" | "Vegetables";
    public items?: string[];
    public communityId?: number;
}

export class NativeUserStorageInfo{
    public email: string;
    public displayName: string;
    public idToken: string;
}