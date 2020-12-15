import { AccountModel } from '@/domain/models/account'

export interface LoadAccountByTokenRepository{
  loadByToken: (token: string | object, role?: string) => Promise<AccountModel>;
}
