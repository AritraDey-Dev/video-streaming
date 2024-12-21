import FormGenerator from "@/components/global/form-generator"
import Loader from "@/components/global/loader"
import { useCreateWorkspace } from "@/hooks/useCreateWorkspace"
import { Button } from "@/components/ui/button"


type props={}

export default function WorkspaceForm(props:props){
    const {errors,onFormSubmit,register,isPending}=useCreateWorkspace()

    return(
        <form onSubmit={onFormSubmit}
         className="flex flex-col gap-y-3">
            <FormGenerator
            name="name"
            register={register}
            placeholder="Workspace name"
            errors={errors}
            inputType="input"
            type="text"
            label="Name"/>
            <Button className="w-full text-sm mt-2"
            type="submit"
            disabled={isPending}>
                    <Loader state={isPending} 
                    >Create Workspace</Loader>
            </Button>
        </form>
    )

}