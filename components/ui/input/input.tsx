import { UserSchemaType, userSchema } from '@/components/validation/userSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useFormContext, Controller, useForm } from 'react-hook-form';

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
        <div className="flex flex-col">
            <input
                type={type}
                className={`input my-4 ${errors[label]?.message ? "border-red-500  !mb-1" : ""}`}
                placeholder={placeholder}
                {...register(label as "nationalId" | "phoneNumber")} 
            />
            <span className="text-red-500 text-xs font-medium">
                {errors[label]?.message}
            </span>
        </div>
    );
};

export default CustomInput;