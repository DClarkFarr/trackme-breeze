export default function InputError({
    message,
    touched,
    className = "",
}: {
    touched?: boolean;
    message?: string;
    className?: string;
}) {
    return message && (touched === undefined || touched) ? (
        <p className={"text-sm text-red-600 " + className}>{message}</p>
    ) : null;
}
