import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { AuthObject } from "@/Types/types";
import useAccountsHook from "@/Hooks/useAccountsHook";
import ManageAccount from "@/Components/Account/ManageAccount";

export default function Account({ auth }: { auth: AuthObject }) {
    const { activeAccount } = useAccountsHook();
    return (
        <Authenticated
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard / Account
                </h2>
            }
        >
            <Head title="Account" />

            {activeAccount && <ManageAccount account={activeAccount} />}
        </Authenticated>
    );
}
