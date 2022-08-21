import { ChangeEvent, useEffect } from "react";
import route from "ziggy-js";
import Button from "@/Components/Buttons/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Controls/Input";
import InputError from "@/Components/Messages/InputError";
import Label from "@/Components/Messages/Label";
import { Head, useForm } from "@inertiajs/inertia-react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as "password", event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <Guest>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        Confirm
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
