import { ChangeEvent, FormEvent } from "react";
import route from "ziggy-js";
import Button from "@/Components/Buttons/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Controls/Input";
import InputError from "@/Components/Messages/InputError";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as "email", event.target.value);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <Guest>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-500 leading-normal">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mb-6">
                <Input
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        Email Password Reset Link
                    </Button>
                </div>
            </form>

            <div className="text-center">
                <Link
                    href={route("login")}
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                >
                    Back to Login
                </Link>
            </div>
        </Guest>
    );
}
