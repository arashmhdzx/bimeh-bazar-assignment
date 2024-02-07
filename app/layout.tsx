import Navbar from '@/components/ui/navbar/navbar'
import './globals.css'

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
                    {children}
                </div>
            </body>
        </html>
    )
}
