export type TransactionType = 'charge' | 'withdraw' | 'payment' | 'income';

export type StatusType = 'pending' | 'succeed';

export interface WalletTransactionsResponse {
  status: boolean;
  data: {
    balance: number;
    card?: string;
    shaba?: string;
    transactions: {
      current_page: number;
      data: {
        transaction_dt: string;
        transaction_type: TransactionType;
        amount: number;
        description: string;
        status: StatusType;
      }[];
      first_page_url: string;
      from: number;
      next_page_url?: string;
      path: string;
      per_page: 10;
      prev_page_url?: string;
      to: number;
    };
  };
  message: string;
}
