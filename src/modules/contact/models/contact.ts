export type TransactionType = 'charge' | 'withdraw' | 'payment' | 'income';

export type StatusType = 'pending' | 'succeed';

export interface ContactTransactionsResponse {
  status: boolean;
  contact: {
    tel: number;
    email: string;
    telegram: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    postalCode: number;
  };
  message: string;
}
