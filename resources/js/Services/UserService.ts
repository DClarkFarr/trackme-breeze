import { Account } from "@/Types/types";
import { AxiosHttpClient } from "./apiClient";

const client = new AxiosHttpClient({
    baseURL: "/api/user",
    withCredentials: true,
});

class UserService {
    static async getAccounts() {
        return client.get<Account[]>("/account");
    }
}

export default UserService;
