export interface AddAccount {
  create(account: AddAccount.Params): Promise<AddAccount.Result>;
}

export namespace AddAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
  }

  export type Result = boolean;
}
