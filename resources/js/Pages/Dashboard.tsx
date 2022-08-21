import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { AuthObject } from "@/Types/types";

export default function Dashboard({ auth }: { auth: AuthObject }) {
    console.log("got auth", auth);
    return (
        <Authenticated
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-6 bg-white border-b border-gray-200">
                You're logged in!
            </div>
        </Authenticated>
    );
}
