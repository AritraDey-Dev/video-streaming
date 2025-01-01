"use client";
import Loader from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton';
import { useMoveVideos } from '@/hooks/useFolder';
import React from "react";

type Props = {
  videoId: string;
  currentWorkspace: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({ videoId, currentWorkspace, currentFolder, currentFolderName }: Props) => {
  const {
    register,
    isPending,
    onFormSubmit,
    folders,
    workspaces,
    isFetching,
    isFolders,
  } = useMoveVideos(videoId, currentWorkspace!)
  const folder = folders.find((folder) => folder.id === currentFolder)
  const workspace = workspaces.find((workspace) => workspace.id === currentWorkspace)
  // console.log("hi there")
  // console.log("hit there", folders)
  // console.log("folders", isFolders)
  return (<form className="flex flex-col gap-y-5"
    onSubmit={onFormSubmit}>
    {/* Current Workspace & Folder */}
    <div className="rounded-xl border-[1px] border-[#333] p-5 bg-transparent">
      <h2 className="text-xs text-[#a4a4a4]">Current Workspace</h2>
      {workspace ? (
        <p className="text-sm text-gray-200">{workspace.name} workspace</p>
      ) : (
        <p className="text-sm text-[#a4a4a4]">Workspace not found</p>
      )}
      <h2 className="text-xs mt-4 text-[#a4a4a4]">Current Folder</h2>
      {folder ? (
        <p className="text-sm text-gray-200">{folder.name}</p>
      ) : (
        <p className="text-sm text-[#a4a4a4]">This video has no folder</p>
      )}
    </div>

    <Separator orientation="horizontal" />

    {/* Move To Section */}
    <div className="flex flex-col gap-y-4 border-[1px] border-[#333] rounded-xl p-5 bg-transparent">
      <h2 className="text-sm text-gray-200 font-semibold">Move To</h2>

      {/* Workspace Selector */}
      <Label className="flex flex-col gap-y-1">
        <span className="text-xs text-[#a4a4a4]">Workspace</span>
        <select
          className="rounded-lg border border-[#444] p-2 text-sm text-gray-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#555]"
          {...register('workspace_id')}
        >
          {workspaces.map((workspace) => (
            <option key={workspace.id} value={workspace.id} className="text-[#a4a4a4]">
              {workspace.name}
            </option>
          ))}
        </select>
      </Label>

      {isFetching ? (
        <Skeleton className="w-full h-[40px] rounded-xl" />
      ) : (
        <Label className="flex flex-col gap-y-2">
          <p className="text-xs">Folders in this workspace</p>
          {isFolders && isFolders.length > 0 ? (
            <select
              {...register('folder_id')}
              className="rounded-xl bg-transparent text-base border-[#444]"
            >
              {isFolders.map((folder, key) =>
                key === 0 ? (
                  <option
                    className="text-[#a4a4a4]"
                    key={folder.id}
                    value={folder.id}
                  >
                    {folder.name}
                  </option>
                ) : (
                  <option
                    className="text-[#a4a4a4]"
                    key={folder.id}
                    value={folder.id}
                  >
                    {folder.name}
                  </option>
                )
              )}
            </select>
          ) : (
            <p className="text-sm text-[#a4a4a4]">No folders in this workspace</p>
          )}
        </Label>

      )}
    </div>
    <Button >
      <Loader state={isPending} color="#000">Move</Loader>
    </Button>
  </form>
  );

}

export default ChangeVideoLocation;