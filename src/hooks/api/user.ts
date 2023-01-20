import { useQuery, useMutation } from "react-query";
import { CreateAccountData } from "../../context/models";
import api from "../../services";

export const useCreateAccount = () => {
  const { mutateAsync, isLoading } = useMutation(
    (accountData: CreateAccountData) => api.createAccount(accountData),
    {
      onSuccess: () => {
        console.log("User registered successfully");
      },
      onError: (e) => {
        console.error(e);
      },
    }
  );
  return {
    createAccount: mutateAsync,
    isCreatingAccount: isLoading,
  };
};

export const useLoginWithWallet = () => {
  const { mutateAsync, isLoading } = useMutation(
    (walletName: string) => api.loginWithWallet(walletName),
    {
      onSuccess: () => {
        console.log("User logged in successfully");
      },
      onError: (e) => {
        console.error(e);
      },
    }
  );
  return {
    loginWithWallet: mutateAsync,
    isLoggingIn: isLoading,
  };
};

export const useVerifyUser = () => {
  const { mutateAsync, isLoading } = useMutation(
    ({ walletName, code }: any) => api.verifyUser(walletName, code),
    {
      onSuccess: () => {
        console.log("User verified in successfully");
      },
      onError: (e) => {
        console.error(e);
      },
    }
  );
  return {
    verifyUser: mutateAsync,
    isVerifying: isLoading,
  };
};

export const useCreatePasscode = () => {
  const { mutateAsync, isLoading } = useMutation(
    (code: string) => api.createPasscode(code),
    {
      onSuccess: () => {
        console.log("Passcode created successfully");
      },
      onError: (e) => {
        console.error(e);
      },
    }
  );
  return {
    createPasscode: mutateAsync,
    isCreatingPasscode: isLoading,
  };
};

export const useGetAccountDetails = () => {
  const { data, isLoading } = useQuery(
    "getAccountDetails",
    () => api.getAccountDetails(),
    {
      onSuccess: (details: any) => {
        console.log("Details fetched successfully", details);
      },
      onError: (err: any) => {
        console.error(err);
      },
    }
  );

  return {
    accountDetails: data,
    isGettingDetails: isLoading,
  };
};
