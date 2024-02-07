import { ReactNode } from "react";

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    text: string | ReactNode;
    disabled?: boolean;
    customStyle?:string;
    buttonStyle?: 'button-primary'|'button-secondary'|'button-outline';
}

export default ButtonProps;
