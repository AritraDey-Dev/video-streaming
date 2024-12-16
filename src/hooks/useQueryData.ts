import { Enabled, QueryFunction, QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryData = (queryKey:QueryKey,
    queryFn:QueryFunction,
    enabled?:Enabled) => {
    const {data,isPending,isFetched,refetch,isFetching} = useQuery({queryKey,queryFn,enabled});
    return {data,isPending,isFetched,refetch,isFetching};
}
