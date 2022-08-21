import { ButtonHTMLAttributes, ReactNode } from "react";

export default function Button({
    type = "submit",
    className = "",
    processing = false,
    bg = "bg-gray-900 active:bg-gray-900",
    color = "text-white",
    children,
}: {
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    className?: string;
    processing?: boolean;
    children: ReactNode;
    bg?: string;
    color?: string;
}) {
    return (
        <button
            type={type}
            className={`inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs tracking-widest transition ease-in-out duration-150 
                ${processing && "opacity-25"}
                ${bg}
                ${color}
                ${className}`}
            disabled={processing}
        >
            {children}
        </button>
    );
}
