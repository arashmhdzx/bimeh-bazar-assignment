'use client'

// components
import Navbar from '@/components/ui/navbar/navbar'
import Sections from '@/components/ui/section/sections'


import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'

import { UserSchemaType, userSchema } from '@/components/validation/userSchema'

import SaveOrderRequest from '@/types/order'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import AddressProps from '@/types/address';


export default function Home() {
    const [selectedAddress, setSelectedAddress] = useState<AddressProps | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UserSchemaType>({
        resolver: yupResolver(userSchema),
    });

    const onSubmit = (payload: UserSchemaType) => {
        console.log("The payload is", payload);
    };

    return (

        <main className='flex flex-col px-5 mt-10 mb-8 h-full'>
            <Sections title='لطفا اطلاعات شخصی مالک خودرو را وارد کنید :' >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                    <div className='flex flex-col mb-4'>
                        <Input errors={errors} register={register} label='nationalId' placeholder='کد ملی' />
                        <Input errors={errors} register={register} label='phoneNumber' placeholder='شماره تلفن همراه' />
                    </div>
                    <Sections title='آدرس جهت درج روی بیمه نامه' titleFontWeight='semibold'>
                        <div className='flex flex-col'>
                            {
                                selectedAddress ?
                                    <p>{selectedAddress?.name}</p>
                                    :
                                    <p>لطفا آدرسی را که می‌خواهید روی بیمه‌نامه درج شود، وارد کنید.</p>
                            }
                            {
                                selectedAddress ? null :
                                    <Button buttonStyle='button-secondary' text='انتخاب از آدرس‌های من' customStyle='mt-3' onClick={() => { }} />
                            }
                        </div>
                    </Sections>
                    <div className='flex justify-end mt-6'>
                        <Button text="تایید و ادامه" type='submit' buttonStyle='button-primary' customStyle='w-fit' />
                    </div>
                </form>
            </Sections>
        </main>
    )
}
