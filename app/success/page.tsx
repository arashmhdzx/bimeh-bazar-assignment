'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'


const SuccessPage = () => {

    const router = useRouter()

    const onBackHandler = () => {
        router.back()
    }

    return (
        <main className='main justify-between'>
            <h1 className=' text-xl font-semibold text-[#34A862]'>اطلاعات شما با موفقیت ثبت شد.</h1>
            <div className='flex justify-end'>
                <Button text="بازگشت" onClick={onBackHandler} />
            </div>
        </main>
    )
}

export default SuccessPage