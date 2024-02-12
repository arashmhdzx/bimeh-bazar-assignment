import React from 'react';

interface CustomInputProps {
    label: "nationalId" | "phoneNumber";
    type?: 'text' | 'number';
    placeholder?: string;
    register:any;
    errors:any;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    type,
    placeholder = '',
    register,
    errors,
}: CustomInputProps) => {



    return (
        <div className={`flex flex-col`}>
            <input
                type={type}
                className={`input mt-0.5 mb-5 ${errors[label]?.message ? "border-[#E61F10]  !mb-1" : ""}`}
                placeholder={placeholder}
                {...register(label as "nationalId" | "phoneNumber")} 
            />
            <span className="text-[#E61F10] text-xs font-medium">
                {errors[label]?.message}
            </span>
        </div>
    );
};

export default CustomInput;