import CreateWorkspace from "@/components/global/create-workspace";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import CreateFolders from "@/components/global/create-folders";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Folders from "@/components/global/folders";
import { getAllUserVideos, getWorkspaceFolders } from "@/actions/workspace";
import Videos from "@/components/global/videos";
type Props = {
    params:{
        workSpaceId:string;
    }
}

const DashboardPage = async ({params:{workSpaceId}}: Props) => {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ['workspace-folders'],
    queryFn: () => getWorkspaceFolders(workSpaceId),
  })

  await query.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: () => getAllUserVideos(workSpaceId),
  })
 
    return    <HydrationBoundary state={dehydrate(query)}>
    <div>
        <Tabs
          defaultValue="videos"
          className="mt-6"
        >
          <div className="flex w-full justify-between items-center">
            <TabsList className="bg-transparent gap-2 pl-0">
              <TabsTrigger
                className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
                value="videos"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
              >
                Archive
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-x-3">
              <CreateWorkspace />
              <CreateFolders workspaceId={workSpaceId} />
            </div>
          </div>
          <section className="py-9">
            <TabsContent value="videos">
              <Folders workspaceId={workSpaceId} />
              <Videos
        workspaceId={workSpaceId}
        folderId={workSpaceId}
        videosKey="user-videos"
      />
            </TabsContent>
          </section>
        </Tabs>
      </div>
  </HydrationBoundary>
   
}

export default DashboardPage