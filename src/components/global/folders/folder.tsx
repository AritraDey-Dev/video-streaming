"use client"
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loader from "../loader";
import FolderDuotone from "@/components/icons/folder-duotone";
import { useMutationData } from "@/hooks/useMutationData";
import { renameFolders } from "@/actions/workspace";

type props={
    name:string;
    id:string;
    optimistic?:boolean;
    count?:number;
}
const Folder=({name,id,optimistic,count}:props)=>{
    const pathName=usePathname();
    const router=useRouter();
    const [rename,setRename]=useState(false);
    const inputRef=useRef<HTMLInputElement|null>(null);
    const folderCardRef=useRef<HTMLDivElement|null>(null);
    const handleClick=()=>{
        router.push(`${pathName}/folder/${id}`)
    }
    const handleDoubleClick=(e:React.MouseEvent<HTMLParagraphElement>)=>{
        e.stopPropagation();
    }
    const Rename=()=>setRename(true);
    const Renamed=()=>setRename(false);
// const updateFolderName=(e:Event)=>{
//     if(inputRef.current && folderCardRef.current){
//         if(!inputRef.contains(e.target as Node)) setRename(false);
// }

    const {isPending,mutate}=useMutationData(['rename-folder'],(data:{name:string})=>renameFolders(id,data.name),false,'workspace-folders',Renamed  )
    return <div 
    onClick={handleClick} className={cn(
        optimistic && 'opacity-60',
        'flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg  border-[1px]'
      )}
      ref={folderCardRef}>
        <Loader state={false}>
            <div className="flex flex-col gap-[1px]">
                <p className="text-neutral-300 "
                onDoubleClick={(e)=>{
                    handleDoubleClick(e);
                    
                }}>{name}</p>
             <span className="text-sm text-neutral-500">{count ||0}</span>
            </div>
        </Loader>
  <FolderDuotone />
    </div>
}

export default Folder;