import { getAllUserVideos, getFolderInfo } from "@/actions/workspace";
import { FolderInfo } from "@/components/global/folders/info";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

type props = {
    params:{
        folderId:string,
        workspaceId:string
    }
}

const FolderPage=async ({params:{folderId,workspaceId}}:props)=>{
        const query=new QueryClient();
        await query.prefetchQuery({
            queryKey:['folder-videos'],
            queryFn:()=>getAllUserVideos(folderId),
        })
       await query.prefetchQuery({
            queryKey:['folder-info'],
            queryFn:()=>getFolderInfo(folderId),
        })  
    return <HydrationBoundary state={dehydrate(query)}>
        <FolderInfo folderId={folderId}/>
    </HydrationBoundary>
}

export default FolderPage;