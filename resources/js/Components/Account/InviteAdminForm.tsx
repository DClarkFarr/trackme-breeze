import { Account } from "@/Types/types";
import Button from "../Buttons/Button";
import Input from "../Controls/Input";
import InputError from "../Messages/InputError";
import Label from "../Messages/Label";
import { useFormik } from "formik";
import { validateEmail } from "@/Methods/validate";
import { useInviteAdminMutation } from "@/Hooks/useAccountsHook";

const InviteAdminForm = ({ account }: { account: Account }) => {
    const { inviteError, inviteAdmin } = useInviteAdminMutation();

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleSubmit,
        resetForm,
    } = useFormik({
        initialValues: {
            email: "",
            name: "",
        },
        onSubmit: (values) => {
            return inviteAdmin(account.id, values).then(() => {
                resetForm();
            });
        },
        validate: (values) => {
            const response: Partial<{ email: string; name: string }> = {};

            if (values.name.length < 4) {
                response.name = "Please enter a full name";
            }

            if (!validateEmail(values.email)) {
                response.email = "Please use a valid email";
            }

            return response;
        },
    });

    return (
        <form onSubmit={handleSubmit} className="mb-2">
            <div className="lg:flex gap-x-4 mb-2">
                <div>
                    <Label forInput="name" value="Name" />

                    <Input
                        name="name"
                        value={values.name}
                        className="mt-1 block w-full"
                        handleChange={handleChange}
                    />

                    <InputError
                        touched={touched.name}
                        message={errors.name}
                        className="mt-2"
                    />
                </div>
                <div>
                    <Label forInput="email" value="Email" />

                    <Input
                        name="email"
                        value={values.email}
                        className="mt-1 block w-full"
                        handleChange={handleChange}
                    />

                    <InputError
                        touched={touched.email}
                        message={errors.email}
                        className="mt-2"
                    />
                </div>

                <div className="flex flex-col">
                    <Label forInput="email" value="&nbsp;" className="w-4" />
                    <Button className="my-auto" processing={isSubmitting}>
                        Invite
                    </Button>
                </div>
            </div>
            {!!inviteError && <InputError message={inviteError.message} />}
        </form>
    );
};

export default InviteAdminForm;
