import { ReactNode } from "react";

interface SectionsProps{
    title:string;
    titleFontWeight?:"normal"|"semibold"|"bold"
    customClass?:string;
    children?:ReactNode;
}

const Sections:React.FC<SectionsProps>  = ({ title ,customClass ,titleFontWeight="normal" ,children}) => {
    return (
        <div className={`flex flex-col ${customClass}`}>
            <h3 className={`pb-2 mb-4 border-b border-border-color font-${titleFontWeight}`}>{title}</h3>
            {children}
        </div>
    )
}

export default Sections