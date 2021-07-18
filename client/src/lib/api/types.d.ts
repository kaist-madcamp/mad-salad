import { CoreOutput } from '../CoreOutput';

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

interface LoginUserOutput extends CoreOutput {
  token?: string;
}

export interface FetchHistoryInput {
  year: number;
  month: number;
}
export interface FetchHistoryData {
  id: number;
  userId: number;
  categoryId: number;
  accountId: number;
  accoundSubId: number;
  amount: number;
  type: string;
  content: string;
  createdAt: string;
}

export interface FetchHistoryOutput extends CoreOutput {
  data: FetchHistoryData[];
}

export interface FetchHistoryByCategoryData {
  category: number;
  _sum: {
    amount: number;
  };
}
export interface FetchHistoryByCategoryOutput extends CoreOutput {
  data: FetchHistoryByCategoryData[];
}
