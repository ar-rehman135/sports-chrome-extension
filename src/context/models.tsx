export interface CreateAccountData {
  email?: string;
  countryCode?: string;
  phone?: string;
  mode?: string;
  fullName?: string;
  walletName?: string;
  phrase?: string;
  status?: STATUS_CREATE_ACCT;
  passcode?: string;
}

export enum STATUS_CREATE_ACCT {
  NONE_CREATED,
  PENDING_VERIFICATION,
  PENDING_NEAR_ACCT,
}
