import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import {Loader2} from "lucide-react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    isLoading,
    type = "button",
    ...props
}, ref) => {
    return (
        <button type={type}
        className={twMerge("w-full flex items-center justify-center gap-x-4 rounded-full bg-neutral-50 border border-transparent p-3 disabled:cursor-not-allowed disabled:opacity-75 transition text-rose-500/55 font-bold hover:bg-neutral-100", className)}
        disabled={isLoading}
        ref={ref}
        {...props}
        >
            {isLoading ? <Loader2 className='ml-4 h-4 w-4 animate-spin' /> : null}
            {children}
        </button>
    )
})

Button.displayName = "Button";
 
export default Button;