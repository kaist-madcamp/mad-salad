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
  categoryId: number;
  amount: number;
  categoryName: string;
}
export interface FetchHistoryByCategoryOutput extends CoreOutput {
  data: FetchHistoryByCategoryData[];
}

export interface FetchHistoryByCreatedAtData {
  id: number;
  accountId: number;
  type: 'INCOME' | 'EXPENDITURE' | 'RECEIVE' | 'SEND';
  content: string;
  createdAt: string;
  amount: number;
  categoryId: number;
  accountSubId: number;
  userId: number;
  account: {
    name: string;
  }
}
export interface FetchHistoryByCreatedAtOutput extends CoreOutput {
  data: FetchHistoryByCreatedAtData[][];
}
