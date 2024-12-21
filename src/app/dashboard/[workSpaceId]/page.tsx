import CreateWorkspace from "@/components/global/create-workspace";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import CreateFolders from "@/components/global/create-folders";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Folders from "@/components/global/folders";
type Props = {
    params:{
        workSpaceId:string;
    }
}

const DashboardPage = ({params}: Props) => {
    return  <div>
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
              <CreateFolders workspaceId={params.workSpaceId} />
            </div>
          </div>
          <section className="py-9">
            <TabsContent value="videos">
              <Folders workspaceId={params.workSpaceId} />
            </TabsContent>
          </section>
        </Tabs>
      </div>
   
}

export default DashboardPage