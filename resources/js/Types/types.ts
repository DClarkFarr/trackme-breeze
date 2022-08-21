export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
};
export type AuthObject = {
    user: User;
};

export type AccountUserPivot = {
    id_user: number;
    id_account: number;
    role: "owner" | "admin";
    status: "accept" | "pending" | "reject";
    status_at: string;
    created_at: string;
    updated_at: string;
    active: 1 | 0;
};
export type Account = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

export type AccountWithPivot = Account & {
    pivot: AccountUserPivot;
};

export type UserWithPivot = User & {
    pivot: AccountUserPivot;
};

export type AccountWithUsers = AccountWithPivot & {
    users: UserWithPivot[];
};
