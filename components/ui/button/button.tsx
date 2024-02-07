'use client'

import ButtonProps from "@/types/button";


const Button: React.FC<ButtonProps> = ({
    type="button",
    onClick,
    text,
    disabled = false,
    buttonStyle = "button-primary",
    customStyle
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${disabled ? "pointer-events-none bg-slate-600" : ""} ${buttonStyle} ${customStyle}`}
        >
            {text}
        </button>
    );
};



export default Button