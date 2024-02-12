'use client'

import { useEffect, useState } from 'react';


// components
import Sections from '@/components/ui/section/sections'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toastify from '@/components/ui/toastify/toastify';
import AddressModal from '@/components/ui/modal/addressModal';


import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'

import { UserSchemaType, userSchema } from '@/components/validation/userSchema'

import { useRequestProcessor } from '@/hooks/useRequestProccessor';

// Api calls
import { getAllAdresses } from '@/services/address';

// types
import AddressProps from '@/types/address';
import { useRouter } from 'next/navigation';
import { postNewOrder } from '@/services/order';


export default function Home() {

    const [selectedAddress, setSelectedAddress] = useState<AddressProps | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter()

    const { Query, Mutate } = useRequestProcessor()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UserSchemaType>({
        resolver: yupResolver(userSchema),
    });

    const { data } = Query('address-list', getAllAdresses);

    const { mutate } = Mutate("storeOrders",
    postNewOrder,
        {
            onSuccess: () => {
                toastify("با موفقیت ثبت شد . تا چند ثانیه دیگر منتقل میشوید", "success")
                setTimeout(() => {
                        router.push("/success");
                }, 2500)
            },
            onError: (data: any) => {
                toastify(data.response.data.errors[0], "error")
            }
        }
    )

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('formData='))
            ?.split('=')[1];

        const formDataFromCookie = cookieValue ? JSON.parse(cookieValue) : null;
        if (formDataFromCookie) {
            setValue('nationalId', formDataFromCookie.nationalId);
            setValue('phoneNumber', formDataFromCookie.phoneNumber);
            setSelectedAddress(formDataFromCookie.addressId)
        }
    }, [setValue]);

    const onSubmit = async (payload: UserSchemaType) => {

        if (selectedAddress) {
            document.cookie = `formData=${JSON.stringify({ ...payload })}`;
            mutate({ ...payload, addressId: selectedAddress.id })
        }
        else {
            toastify("لطفا آدرس را انتخاب کنید", "warning")
        }
    };
    const selectedAddressHandler = (data: AddressProps) => {
        setSelectedAddress(data)
    };

    return (

        <main className='main'>
            <AddressModal addresses={data} selectedAddressHandler={selectedAddressHandler} isOpen={isModalOpen} onRequestClose={closeModal} />
            <Sections title='لطفا اطلاعات شخصی مالک خودرو را وارد کنید :' customClass='h-full' >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full'>
                    <div className='flex flex-col mb-4'>
                        <Input errors={errors} register={register} type='number' label='nationalId' placeholder='کد ملی' />
                        <Input errors={errors} register={register} type='number' label='phoneNumber' placeholder='شماره تلفن همراه' />
                    </div>
                    <Sections title='آدرس جهت درج روی بیمه نامه' customClass='mt-5' titleFontWeight='semibold'>
                        <div className='flex flex-col'>
                            {
                                selectedAddress ?
                                    <p className='font-medium'>{selectedAddress.name}</p>
                                    :
                                    <p>لطفا آدرسی را که می‌خواهید روی بیمه‌نامه درج شود، وارد کنید.</p>
                            }
                            {
                                selectedAddress ? null :
                                    <Button buttonStyle='button-secondary' text='انتخاب از آدرس‌های من' customStyle='mt-6' onClick={() => openModal()} />
                            }
                        </div>
                    </Sections>
                    <div className='flex justify-end mt-auto'>
                        <Button text="تایید و ادامه" type='submit' buttonStyle='button-primary' customStyle='w-fit my-8' />
                    </div>
                </form>
            </Sections>
        </main>
    )
}
