import { useQuery } from "react-query";
import api from "../../services";
import { getRequest } from "../../services/utils";

export const useGetAppById = (appId: string) => {
	const { data, isLoading } = useQuery("app", () => api.getAppById(appId), {
		onError: (e) => {
			console.error(e);
		},
	});
	return {
		app: data,
		isSearching: isLoading,
	};
};

export const useGetApps = () => {
	const { data, isLoading } = useQuery("apps", () => api.getApps(), {
		onError: (e) => {
			console.error(e);
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	return {
		apps: data,
		isSearching: isLoading,
	};
};
export const searchApps = (search: string, token: string) => {
	const END_POINT = `/apps?search=${search}`;
	return getRequest(END_POINT, token);
};

export const useSearchApps = (appName: string) => {
	const { data, isLoading } = useQuery(
		"appresults",
		() => api.searchApps(appName),
		{
			onError: (e) => {
				console.error(e);
			},
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
	return {
		appresults: data,
		isSearching: isLoading,
	};
};
export const useGetConnectedApps = () => {
    const { data, isLoading } = useQuery('connectedApps',
        () => api.getConnectedApps(),
    );
    return {
        connectedApps: data && Array.isArray(data?.data) && data?.data.filter((obj: any) => obj !== null),
        isSearchingConnectedApp: isLoading,
        totalConnectedApps: data?.total_connected_apps
    };
};

export const useGetCategoryById = (categoryId: string| undefined) => {
	return useQuery(`apps/categories/${categoryId}`, () => api.getCategoryById(categoryId && categoryId || ''), {
		enabled: categoryId ? true : false
	});
}
export const useGetAppActivity = (appId: string | undefined) => {
	return useQuery(`apps/activity/${appId}`, () => api.getAppActivityByAppId(appId && appId || ''), {
		enabled: appId ? true : false
	})
}