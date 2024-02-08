'use client'
import { toast } from 'react-toastify'


const toastify = ( content:string, type:"info" | "success" | "warning" | "error") => {

    switch (type) {
        case "info":
            return toast.info(content);

        case "success":
            return toast.success(content);

        case "warning":
            return toast.warn(content);

        case "error":
            return toast.error(content);

        default:
            return toast.success(content);
    }
}

export default toastify