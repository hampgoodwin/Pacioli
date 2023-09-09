export type account = {
  id: string;
  name: string;
  type: string;
  basis: string;
  createdAt: string;
};

export const emptyAccount: account = {
  id: '',
  name: '',
  type: '',
  basis: '',
  createdAt: ''
};

export const exampleAccount: account = {
  id: '2Udk3rSRsEu5r6W2TurWA4rj2pu',
  name: 'example liability account',
  type: 'liability',
  basis: 'credit',
  createdAt: '2023-08-28T20:37:28.382365Z'
};

export type listAccountResponse = {
  accounts: account[];
  nextCursor: string;
};

export type createAccount = {
  name: string;
  type: string;
  basis: string;
};

export const emptyDefaultCreateAccount = {
  name: '',
  type: 'asset',
  basis: 'debit'
};

export type createAccountRequest = {
  account: createAccount;
};

export type createAccountResponse = {
  account: account;
};
