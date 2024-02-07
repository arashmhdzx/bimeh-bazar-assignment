interface NavbarProps {
    title: string;
}


const Navbar:React.FC<NavbarProps> = ({ title }) => {
    return (
        <div className="flex flex-col shadow-lg">
            <h1 className=" py-[14px] px-4 text-lg font-semibold">{title}</h1>
        </div>
    )
}

export default Navbar