import { ChangeEvent, FormEvent, useEffect } from "react";
import route from "ziggy-js";
import Button from "@/Components/Buttons/Button";
import Checkbox from "@/Components/Controls/Checkbox";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Controls/Input";
import InputError from "@/Components/Messages/InputError";
import Label from "@/Components/Messages/Label";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData(
            event.target.name as keyof typeof data,
            event.target.type === "checkbox"
                ? event.target.checked
                    ? "1"
                    : "0"
                : event.target.value
        );
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <Guest>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mb-6">
                <div>
                    <Label forInput="email" value="Email" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            handleChange={onHandleChange}
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Button className="ml-4" processing={processing}>
                        Log in
                    </Button>
                </div>
            </form>

            <div className="text-center">
                <Link
                    href={route("register")}
                    className="text-sm text-gray-600 hover:text-gray-900"
                >
                    Create account?
                </Link>
            </div>
        </Guest>
    );
}
