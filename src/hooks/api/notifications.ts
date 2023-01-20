import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../services";

export const useGetUnreadNotificationsAmount = () => {
  const { data, isLoading } = useQuery(
    "useGetUnreadNotificationsAmount",
    () => api.getUnreadNotificationsAmount(),
    {
      onError: (e) => {
        console.error(e);
      },
      refetchInterval: 5000,
    }
  );
  return {
    notificationAmount: data,
    isLoading,
  };
};

export const useGetAllNotifications = () => {
  const { data, isLoading } = useQuery(
    "getAllNotifications",
    () => api.getAllNotifications(),
    {
      onError: (e) => {
        console.error(e);
      },
    }
  );
  return {
    notifications: data,
    isLoading,
  };
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    () => api.markAllNotificationsAsRead(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllNotifications");
        queryClient.invalidateQueries("useGetUnreadNotificationsAmount");
        console.log("Notifications marked as read successfully");
      },
      onError: (e) => {
        console.error(e);
      },
    }
  );
  return {
    markAllAsRead: mutateAsync,
    isMarkingAllAsRead: isLoading,
  };
};
