'use client'

import { useEffect, useState } from 'react';


// components
import Navbar from '@/components/ui/navbar/navbar'
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
import SaveOrderRequest from '@/types/order'
import AddressProps from '@/types/address';
import { useRouter } from 'next/navigation';


export default function Home() {

    const initialData = {
        name: "شرکت نقش‌آفرینان شرق",
        details: "فارس، شیراز، خیابان جمهوری، بالاتر از فلان، پلاک ۶، واحد ۲۳۴"
    }

    const [address, setAddress] = useState(Array.from({ length: 5 }, (_, index) => ({ ...initialData, id: (index + 1).toString() })))
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


    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // const { data } = Query('address-list',getAllAdresses)
    // console.log(data)

    useEffect(() => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('formData='))
            ?.split('=')[1];

        const formDataFromCookie = cookieValue ? JSON.parse(cookieValue) : null;
        console.log(cookieValue)
        if (formDataFromCookie) {
            setValue('nationalId', formDataFromCookie.nationalId);
            setValue('phoneNumber', formDataFromCookie.phoneNumber);
            setSelectedAddress(formDataFromCookie.addressId)
        }
    }, [setValue]);

    const onSubmit = (payload: UserSchemaType) => {

        if (selectedAddress) {
            document.cookie = `formData=${JSON.stringify({ ...payload, addressId: selectedAddress })}`;
            toastify("با موفقیت ثبت شد . تا چند ثانیه دیگر منتقل میشوید", "success")
            setTimeout(() => {
                    router.push("/success");
            }, 2500)
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
            <AddressModal addresses={address} selectedAddressHandler={selectedAddressHandler} isOpen={isModalOpen} onRequestClose={closeModal} />
            <Sections title='لطفا اطلاعات شخصی مالک خودرو را وارد کنید :' customClass='h-full' >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full'>
                    <div className='flex flex-col mb-4'>
                        <Input errors={errors} register={register} label='nationalId' placeholder='کد ملی' />
                        <Input errors={errors} register={register} label='phoneNumber' placeholder='شماره تلفن همراه' />
                    </div>
                    <Sections title='آدرس جهت درج روی بیمه نامه' titleFontWeight='semibold'>
                        <div className='flex flex-col'>
                            {
                                selectedAddress ?
                                    <p>{selectedAddress.name}</p>
                                    :
                                    <p>لطفا آدرسی را که می‌خواهید روی بیمه‌نامه درج شود، وارد کنید.</p>
                            }
                            {
                                selectedAddress ? null :
                                    <Button buttonStyle='button-secondary' text='انتخاب از آدرس‌های من' customStyle='mt-3' onClick={() => openModal()} />
                            }
                        </div>
                    </Sections>
                    <div className='flex justify-end mt-auto'>
                        <Button text="تایید و ادامه" type='submit' buttonStyle='button-primary' customStyle='w-fit' />
                    </div>
                </form>
            </Sections>
        </main>
    )
}
