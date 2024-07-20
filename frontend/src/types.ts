export interface Customer {
    id: number;
    name: string;
    email: string;
    balance: number;
}

export interface Transfer {
    fromCustomerId: number;
    toCustomerId: number;
    amount: number;
}
