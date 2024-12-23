"use client";
import FolderPlusDuotine from "@/components/icons/folder-plus-duotone";
import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/useCreateFolders";
import React from "react";

type props={
    workspaceId:string;
}

const CreateFolders=({workspaceId}:props)=>{
    const {onCreateFolder}=useCreateFolders(workspaceId)
    return    <Button
    onClick={onCreateFolder}
    className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl"
  >
    <FolderPlusDuotine />
    Create A folder
  </Button>
}  

export default CreateFolders;