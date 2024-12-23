"use client";
import { getFolderInfo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { FolderProps } from "@/types/index.type";
import React from "react";

type Props={
    folderId:string;
}

export const FolderInfo=({folderId}:Props)=>{
  const {data}=useQueryData(['folder-info'],()=>getFolderInfo(folderId))
  const {data:folders}=data as FolderProps;

  return <div className="flex items-center">  
  <h2 className="text-[#BdBdBd] text-2xl">
    {folders?.name}
  </h2>
  </div>
}