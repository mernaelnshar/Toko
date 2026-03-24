import { z } from "zod";

export const getLoginSchema = (lang) => z.object({
    email: z
        .string()
        .min(1, lang === "EN" ? "Email is required" : "البريد الإلكتروني مطلوب")
        .email(lang === "EN" ? "Invalid email format" : "صيغة البريد الإلكتروني غير صحيحة"),
    password: z
        .string()
        .min(6, lang === "EN" ? "Password must be at least 6 characters" : "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export const getRegisterSchema = (lang) => z.object({
    name: z
        .string()
        .min(3, lang === "EN" ? "Name must be at least 3 characters" : "الاسم يجب أن يكون 3 أحرف على الأقل"),
    email: z
        .string()
        .min(1, lang === "EN" ? "Email is required" : "البريد الإلكتروني مطلوب")
        .email(lang === "EN" ? "Invalid email" : "إيميل غير صحيح"),
    address: z
        .string()
        .min(5, lang === "EN" ? "Please enter a valid address" : "يرجى إدخال عنوان صحيح"),
    password: z
        .string()
        .min(6, lang === "EN" ? "Password must be at least 6 characters" : "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z
        .string()
        .min(1, lang === "EN" ? "Please confirm your password" : "تأكيد كلمة المرور مطلوب"),
}).refine((data) => data.password === data.confirmPassword, {
    message: lang === "EN" ? "Passwords don't match" : "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
});

export const getForgotSchema = (lang) => z.object({
    email: z
        .string()
        .min(1, lang === "EN" ? "Email is required" : "البريد الإلكتروني مطلوب")
        .email(lang === "EN" ? "Invalid email format" : "صيغة البريد الإلكتروني غير صحيحة"),
});