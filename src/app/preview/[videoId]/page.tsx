import { getPreviewVideo } from "@/actions/workspace";
import VideoPereview from "@/components/global/videos/preview";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  params: {
    videoId: string;
  };
};

const VideoPage=async ({params:{videoId}}:Props)=>{
    const query=new QueryClient();
    await query.prefetchQuery({
        queryKey:['preview-video'],
        queryFn:()=>getPreviewVideo(videoId),
    });

return(
    <HydrationBoundary state={dehydrate(query)}>
        <VideoPereview videoId={videoId} />
    </HydrationBoundary>
)

}
export default VideoPage;