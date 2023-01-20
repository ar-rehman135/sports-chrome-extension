import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import api from "../../services";

export const useGetContacts = (userId: string, reload?: boolean) => {
  const { data, isLoading, refetch, isRefetching } = useQuery(
    "contacts",
    () => api.getContacts(userId),
    {
      onError: (e) => {},
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (reload === true) {
      refetch();
    }
  }, [reload]);

  return {
    contacts: data,
    isLoading: isLoading,
    isRefetching: isRefetching,
  };
};

export const useGetContact = (contactId: string | undefined) => {
  const { data, isLoading } = useQuery(
    ["contact", contactId],
    () => api.getContact(contactId),
    {
      onError: (e) => {
        console.error(e);
      },
      enabled: !!contactId,
    }
  );
  return {
    contact: data,
    isSearching: isLoading,
  };
};

export const useContact = (
  userId: any,
  onSuccess?: () => void,
  onError?: (e: unknown) => void
) => {
  const { mutateAsync, isLoading } = useMutation(
    (contactData: any) => api.createContact(contactData, userId),
    {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (e) => {
        if (onError) {
          onError(e);
        }
      },
    }
  );
  return {
    createContact: mutateAsync,
    isCreating: isLoading,
  };
};

export const useContactBulk = () => {
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    (contactData: any) => api.createContactBulk(contactData),
    {
      onSuccess: () => {},
      onError: (e) => {
        console.error(e);
      },
    }
  );
  return {
    createContacts: mutateAsync,
    isCreating: isLoading,
    isSuccess,
  };
};

export const useEditContact = (
  id: any,
  onSuccess?: () => void,
  onError?: (e: unknown) => void
) => {
  const { mutateAsync, isLoading } = useMutation(
    (contactData: any) => api.editContact(contactData, id),
    {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (e) => {
        if (onError) {
          onError(e);
        }
      },
    }
  );
  return {
    editContact: mutateAsync,
    isCreating: isLoading,
  };
};
