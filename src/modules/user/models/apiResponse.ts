interface FalsyResponse {
  status: false;
  message: string | { [key: string]: string[] };
}

interface TruthyResponse<T> {
  status: true;
  token?: string;
  username?: string;
  data?: T;
  message: string;
}

export type ApiResponse<T> = TruthyResponse<T> | FalsyResponse;
