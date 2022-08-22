import { Account, AccountWithUsers, UserWithPivot } from "@/Types/types";
import { AxiosHttpClient } from "./apiClient";

const client = new AxiosHttpClient({
    baseURL: "/api/user",
    withCredentials: true,
});

class UserService {
    static async getAccounts() {
        return client.get<AccountWithUsers[]>("/account");
    }

    static async inviteAdmin(
        accountId: number,
        data: {
            email: string;
            name: string;
        }
    ) {
        return client.post<UserWithPivot, typeof data>(
            `/account/${accountId}/invite`,
            data
        );
    }
}

export default UserService;
