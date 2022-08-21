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

/**
 * Account schema 
    [
        {
            "id": 1,
            "name": "Personal Account",
            "created_at": "2022-08-21T03:35:29.000000Z",
            "updated_at": "2022-08-21T03:35:29.000000Z",
            "pivot": {
                "id_user": 2,
                "id_account": 1,
                "role": "owner",
                "status": "accept",
                "status_at": "2022-08-21 03:35:29",
                "created_at": null,
                "updated_at": null,
                "active": 1
            }
        }
    ]
 */
export type Account = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    pivot: {
        id_user: number;
        id_account: number;
        role: "owner" | "admin";
        status: "accept" | "pending" | "reject";
        status_at: string;
        created_at: string;
        updated_at: string;
        active: 1 | 0;
    };
};
