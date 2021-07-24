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
  day?: number | undefined;
}
export interface FetchHistoryData {
  id: number;
  userId: number;
  categoryId: number;
  accountId: number;
  accoundSubId: number;
  amount: number;
  type: 'INCOME' | 'EXPENDITURE' | 'RECEIVE' | 'SEND';
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
  type: 'INCOME' | 'EXPENDITURE' | 'RECEIVE' | 'SEND';
  content: string;
  createdAt: string;
  amount: number;
  accountSubId: number;
  userId: number;
  category: {
    id: number;
    name: string;
  };
  account: {
    id: number;
    name: string;
  };
}
export interface FetchHistoryByCreatedAtOutput extends CoreOutput {
  data: FetchHistoryByCreatedAtData[][];
}

export interface GetAllAccountData {
  id: number;
  balance: number;
  name: string;
  type: string;
  userId: number;
  version: number;
}

export interface GetAllAccountOutput extends CoreOutput {
  data: GetAllAccountData[];
}

export interface GetAllCategoriesData {
  id: number;
  name: string;
  budget: number;
  type: 'EXPENDITURE' | 'INCOME' | 'RECEIVE' | 'SEND';
}
export interface GetAllCategoriesOutput extends CoreOutput {
  data: GetAllCategoiesData[];
}

export interface DefaultHistoryData {
  transactionId: number;
  type: 'expenditure' | 'income' | 'receive' | 'send';
  date: string;
  categoryName: string;
  categoryId: number;
  accountName: string;
  accountId: number;
  amount: string;
  label: string;
}

export interface UpdateTransactionInput {
  transactionId: number;
  content: string;
  amount: string;
  categoryName: string;
  type: 'expenditure' | 'income' | 'receive' | 'send';
  createdAt: string;
  accountId: number;
}

export interface CreateTransactionInput {
  type: 'expenditure' | 'income' | 'receive' | 'send';
  accountId: number;
  content: string;
  amount: string;
  categoryName: string;
  date: string;
}

export interface GetPendingTransactionData {
  id: number;
  type: string;
  content: string;
  createdAt: string;
  amount: number;
  accountId: number;
  categoryId: number;
  accountSubId: number;
  userId: number;
  user: {
    name: string;
  };
}

export interface GetPendingTransactionOutput extends CoreOutput {
  data: GetPendingTransactionData;
}

interface ReceivePendingTransactionInput {
  transactionId: string;
  reply: string;
}
