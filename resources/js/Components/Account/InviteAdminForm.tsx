import { Account } from "@/Types/types";
import { useForm } from "@inertiajs/inertia-react";
import { ChangeEvent, FormEvent } from "react";
import Button from "../Buttons/Button";
import Input from "../Controls/Input";
import InputError from "../Messages/InputError";
import Label from "../Messages/Label";

const InviteAdminForm = ({ account }: { account: Account }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
    });

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as keyof typeof data, event.target.value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="lg:flex gap-x-4">
                <div>
                    <Label forInput="name" value="Name" />

                    <Input
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <Label forInput="email" value="Email" />

                    <Input
                        name="eamil"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="flex flex-col">
                    <Label forInput="email" value="&nbsp;" className="w-4" />
                    <Button className="my-auto" processing={processing}>
                        Invite
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default InviteAdminForm;
