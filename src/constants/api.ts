export const REQUEST_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const API_BASE_URL = `${process.env.API_BASE_URL}`;
export const ENVIRONMENT = `${process.env.ENVIRONMENT}`;
export const API_FETCH_CONTACTS = (userId: string) =>
  `contacts/${userId}/list`;

export const NFT_APP_URL = "https://nftmakerapp.io";
export const NEAR_WALLET_TYPE = ENVIRONMENT === 'PROD'?'.near':'.testnet';