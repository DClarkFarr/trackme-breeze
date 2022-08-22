import ApiError from "@/Errors/ApiError";
import UserService from "@/Services/UserService";
import { AccountWithUsers } from "@/Types/types";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
            refetchOnWindowFocus: false,
            retryOnMount: false,
            refetchOnMount: false,
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

export const useInviteAdminMutation = () => {
    const queryClient = useQueryClient();

    const {
        isLoading: isSubmitting,
        error: inviteError,
        mutateAsync: mutateInviteAdmin,
    } = useMutation(
        (data: { accountId: number; email: string; name: string }) => {
            return UserService.inviteAdmin(data.accountId, {
                email: data.email,
                name: data.name,
            });
        },
        {
            retry: false,
            onSuccess(user, variables) {
                const accounts =
                    queryClient.getQueryData<AccountWithUsers[]>("accounts") ||
                    [];

                const accountIndex = accounts.findIndex(
                    (account) => account.id === variables.accountId
                );

                if (accountIndex > -1) {
                    const userIndex = accounts[accountIndex].users.findIndex(
                        (u) => u.id === user.id
                    );
                    if (userIndex > -1) {
                        accounts[accountIndex].users[userIndex] = user;
                    } else {
                        accounts[accountIndex].users.push(user);
                    }

                    queryClient.setQueryData("accounts", accounts);
                }
            },
            onError: async (error) => {
                console.warn("error inviting admin", error);

                return "hey";
            },
        }
    );

    const inviteAdmin = (
        accountId: number,
        data: { email: string; name: string }
    ) => {
        return mutateInviteAdmin({
            accountId,
            email: data.email,
            name: data.name,
        });
    };

    return {
        isSubmitting,
        inviteError: inviteError as ApiError,
        inviteAdmin,
    };
};

export default useAccountsHook;
