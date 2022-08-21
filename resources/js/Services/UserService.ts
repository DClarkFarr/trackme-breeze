import { Account, AccountWithUsers } from "@/Types/types";
import { AxiosHttpClient } from "./apiClient";

const client = new AxiosHttpClient({
    baseURL: "/api/user",
    withCredentials: true,
});

class UserService {
    static async getAccounts() {
        return client.get<AccountWithUsers[]>("/account");
    }
}

export default UserService;
