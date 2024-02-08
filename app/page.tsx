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
import AddressModal from '@/components/ui/modal/addressModal';
import { useRequestProcessor } from '@/hooks/useRequestProccessor';
import { getAllAdresses } from '@/services/address';


export default function Home() {

    const initialData = {
        name: "شرکت نقش‌آفرینان شرق",
        details: "فارس، شیراز، خیابان جمهوری، بالاتر از فلان، پلاک ۶، واحد ۲۳۴"
    }

    const [address, setAddress] = useState(Array.from({ length: 5 }, (_,index) => ({ ...initialData,id:(index+1).toString() })))
    const [selectedAddress, setSelectedAddress] = useState<AddressProps | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(true);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };


    const { Query, Mutate } = useRequestProcessor()
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UserSchemaType>({
        resolver: yupResolver(userSchema),
    });

    
    // const { data } = Query('address-list',getAllAdresses)
    // console.log(data)
    
    const onSubmit = (payload: UserSchemaType) => {
        console.log("The payload is", payload);
    };
    const selectedAddressHandler = (data:AddressProps) => {
        setSelectedAddress(data)
    };

    return (

        <main className='flex flex-col px-5 mt-10 mb-8 h-full'>
            <AddressModal addresses={address} selectedAddressHandler={selectedAddressHandler} isOpen={isModalOpen} onRequestClose={closeModal} />
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
                    <div className='flex justify-end mt-6'>
                        <Button text="تایید و ادامه" type='submit' buttonStyle='button-primary' customStyle='w-fit' />
                    </div>
                </form>
            </Sections>
        </main>
    )
}
