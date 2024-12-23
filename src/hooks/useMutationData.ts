import { MutationFunction, MutationKey, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
    mutationKey: MutationKey,
    mutationFn: MutationFunction<any, any>,
    enabled?: boolean,
    queryKey?:  string | readonly unknown[],
    onSuccess?: (data: any) => void)=>{
        const client=useQueryClient();
        const {mutate,isPending}=useMutation({mutationKey,mutationFn,
            onSuccess(data){
                if(onSuccess) onSuccess(data);
                return toast(data?.status===200?'Suceess':'Error',{
                    description:data?.data,
                })
            },
            onSettled:async()=>{
                return await client.invalidateQueries({queryKey:[queryKey]});
            }
        });
        return {mutate,isPending};
    }

export const useMutationDataState=(mutationKey:MutationKey)=>{
  const data=useMutationState({
    filters:{mutationKey},
    select:(mutation)=>{
        return {
            variables:mutation.state.variables as any,
            status:mutation.state.status,
        }
    }
  })
  const latestVariables=data[data.length-1];
    return {latestVariables};
}
