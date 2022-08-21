import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { AuthObject } from "@/Types/types";

export default function Profile({ auth }: { auth: AuthObject }) {
    return (
        <Authenticated
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard / Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="p-6 bg-white border-b border-gray-200">
                You're logged in!
            </div>
        </Authenticated>
    );
}
