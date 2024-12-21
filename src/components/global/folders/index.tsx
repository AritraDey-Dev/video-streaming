import FolderDuotone from "@/components/icons/folder-duotone";
import { ArrowRight } from "lucide-react";
import React from "react";
import Folder from "./folder";

type Props={
    workspaceId:string;
}

const Folders=({workspaceId}:Props)=>{
    return <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <FolderDuotone />
              <h2  className="text-[#c7b8b8]
               text-xl ">Folders</h2>

        </div>
        <div className="flex items-center gap-2">
            <p className="text-[BDBDBD]">See All</p>
            <ArrowRight/>

        </div>
</div>
<section className="flex items-center gap-4 overflow-auto w-full">
<Folder name="folder"/>
<Folder name="folder"/>
<Folder name="folder"/>
<Folder name="folder"/>
</section>
    </div>
}

export default Folders;