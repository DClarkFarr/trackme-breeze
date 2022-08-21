import route from "ziggy-js";
import { Link, Head } from "@inertiajs/inertia-react";
import { AuthObject } from "@/Types/types";

export default function Welcome({ auth }: { auth: AuthObject }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative ">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="text-sm text-gray-700 dark:text-gray-500 underline"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="text-sm text-gray-700 dark:text-gray-500 underline"
                            >
                                Log in 2
                            </Link>

                            <Link
                                href={route("register")}
                                className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
