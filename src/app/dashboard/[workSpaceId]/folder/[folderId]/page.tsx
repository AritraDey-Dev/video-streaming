import { getAllUserVideos, getFolderInfo } from "@/actions/workspace";
import { FolderInfo } from "@/components/global/folders/info";
import Videos from "@/components/global/videos";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

type props = {
    params:{
        folderId:string,
        workSpaceId:string
    }
}

const FolderPage=async ({params:{folderId,workSpaceId}}:props)=>{
    // console.log(folderId)  
    const query=new QueryClient();
        await query.prefetchQuery({
            queryKey:['folder-videos'],
            queryFn:()=>getAllUserVideos(folderId),
        })
       await query.prefetchQuery({
            queryKey:['folder-info'],
            queryFn:()=>getFolderInfo(folderId),
        })  
        // console.log(workSpaceId)
    return <HydrationBoundary state={dehydrate(query)}>
        <FolderInfo folderId={folderId}/>
        <Videos
        workspaceId={workSpaceId}
        folderId={folderId}
        videosKey="folder-videos"
      />
    </HydrationBoundary>
}

export default FolderPage;