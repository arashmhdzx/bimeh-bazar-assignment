import * as yup from "yup";


const phoneRegExp = /^09[01235679]\d{8}$|^9[01235679]\d{9}$/;


export const userSchema = yup.object({
    nationalId: yup.string().length(10,"کد ملی وارد شده معتبر نمیباشد").test("nationalId", "کد ملی وارد شده معتبر نیست", (nCode: any) => {
        if (!/^\d{10}$/.test(nCode)) return false;
        const check = +nCode[9];
        const sum = nCode.split('').slice(0, 9).reduce((acc:any, x:any, i:any) => acc + +x * (10 - i), 0) % 11;
        return sum < 2 ? check === sum : check + sum === 11;
    }).required("کد ملی را وارد نمایید"),
    phoneNumber: yup.string().matches(phoneRegExp, 'شماره وارد شده اشتباه است').required(),
    // addressId: yup.string().required(),
    });

export type UserSchemaType = yup.InferType<typeof userSchema>;