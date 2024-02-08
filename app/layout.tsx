import Navbar from '@/components/ui/navbar/navbar'
import './globals.css'
import ReactQueryProvider from '@/utils/reactQueryProvider'

export const metadata = {
    title: 'تکمیل اطلاعات',
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
                </div>
            </body>
        </html>
    )
}
