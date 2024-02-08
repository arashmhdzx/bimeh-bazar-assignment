import { ToastContainer } from 'react-toastify'
import ReactQueryProvider from '@/utils/reactQueryProvider'


import Navbar from '@/components/ui/navbar/navbar'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

export const metadata = {
    title: 'تکمیل اطلاعات | بیمه بازار',
    description: 'تکمیل اطلاعات و ...',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fa">
            <body>
                <div className='flex flex-col min-h-[100dvh]'>
                    <Navbar title='تکمیل اطلاعات' />
                    <ReactQueryProvider>
                        {children}
                    </ReactQueryProvider>
                    <ToastContainer
                        position={"top-left"}
                        autoClose={2500}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl
                        pauseOnFocusLoss
                        pauseOnHover
                        theme={"light"}
                    />
                </div>
            </body>
        </html>
    )
}
