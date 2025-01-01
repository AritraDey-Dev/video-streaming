import { ZodSchema } from "zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z  from "zod";
const  useZodForm=(
    schema:ZodSchema,
    mutation:UseMutateFunction,
    defaultValues?:any,

)=>{
 const {register,
    watch,
    reset,
    handleSubmit,
    formState:{errors},
 }=useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:{...defaultValues},
 })
 const onFormSubmit = handleSubmit(async (values) => {
   try {
     await mutation(values); 
   } catch (error) {
     console.error("Form submission error:", error); // Add error handling
   }
 });
    return {
        register,
        watch,
        reset,
        onFormSubmit,
       errors,
    }
}

export default useZodForm;
