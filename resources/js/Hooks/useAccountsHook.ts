import UserService from "@/Services/userService";
import { useQuery } from "react-query";

const useAccountsHook = () => {
    const {
        isLoading,
        error,
        data: accounts,
        refetch,
    } = useQuery(
        "accounts",
        () => {
            return UserService.getAccounts();
        },
        {
            refetchOnWindowFocus: true,
            retryOnMount: false,
            retry: false,
            onError: (error) => {
                console.warn("error fetching accounts", error);
            },
        }
    );

    const activeAccount = accounts?.find((account) => account.pivot.active);

    return {
        isLoading,
        error,
        refetch,
        activeAccount,
        accounts: accounts || [],
    };
};

export default useAccountsHook;
