import { upperFirst } from "lodash";
import { Account, AccountWithUsers } from "@/Types/types";

import TrashIcon from "~icons/fa-solid/times";
import InviteAdminForm from "./InviteAdminForm";

const ManageAccount = ({ account }: { account: AccountWithUsers }) => {
    const admins = account.users.filter((user) => user.pivot.role === "admin");

    return (
        <div className="p-6 bg-white border-b border-gray-200">
            <div className="mb-4">
                <h3 className="font-semibold text-gray-500 text-xl mb-4">
                    Manage Active Account
                </h3>
                <div className="lg:flex mb-4">
                    <div className="w-1/2">
                        <span className="mr-4">Account name:</span>
                        <span className="font-semibold">{account.name}</span>
                    </div>
                    <div className="w-1/2">
                        <span className="mr-4">My role:</span>
                        <span
                            className={`font-semibold ${
                                account.pivot.role === "owner"
                                    ? "text-emerald-800"
                                    : "text-yellow-800"
                            }`}
                        >
                            {upperFirst(account.pivot.role)}
                        </span>
                    </div>
                </div>
            </div>
            {account.pivot.role === "owner" && (
                <>
                    <h4 className="font-semibold text-lg mb-2">
                        Manage Admins
                    </h4>
                    <table className="table table-md w-full mb-2">
                        <thead>
                            <tr>
                                <th className="text-left">Name</th>
                                <th className="text-left">Email</th>
                                <th className="text-left">Status</th>
                                <th className="text-left">Date</th>
                                <th className="text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => {
                                return (
                                    <tr key={admin.id}>
                                        <td>{admin.name}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.pivot.status}</td>
                                        <td>{admin.pivot.status_at}</td>
                                        <td>
                                            <a
                                                className="text-red-800"
                                                href="#"
                                            >
                                                <TrashIcon />
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                            {admins.length === 0 && (
                                <tr>
                                    <td colSpan={5}>
                                        <p className="text-center p-4">
                                            No admins found
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <h4 className="font-semibold text-lg">Invite Admins</h4>
                    <InviteAdminForm account={account as Account} />
                </>
            )}
        </div>
    );
};

export default ManageAccount;
