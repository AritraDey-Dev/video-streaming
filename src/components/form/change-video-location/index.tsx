import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator'
import { useMoveVideos } from '@/hooks/useFolder';
import React from "react";

type Props = {
    videoId: string;
    currentWorkspace: string;
    currentFolder?: string;
    currentFolderName?: string;
};

const ChangeVideoLocation = ({ videoId, currentWorkspace, currentFolder, currentFolderName }: Props) => {
    const { onFormSubmit,
        errors,
        register,
        isPending,
        folders,
        fetching,
        workspaces,
        isFolders, } = useMoveVideos(videoId, currentWorkspace);
        const folder=folders.find((folder)=>folder.id===currentFolder)
        const workspace=workspaces.find((workspace)=>workspace.id===currentWorkspace)
    return (
        <form className="flex flex-col gap-y-5">
            <div className="rounded-xl border-[1px] p-5">
                <h2 className="text-xs mb-5 text-[#a4a4a4]">Current</h2>
                {workspace && 
<p className="text-[#a4a4a4] text-sm">{workspace.name} workspace</p>
                }
                <p className="text-[#a4a4a4] text-sm">THis video has been moved to</p>
            </div>
            <Separator orientation="horizontal" />
            <div className="flex flex-col gap-y-5 border-[1px] rounded-xl">
                <h2 className="flex-col gap-y-2 flex">
                    To
                </h2>
                <Label className="flex-col gap-y-2 flex">
                    <p className='text-xs'>Workspace</p>
                    <select className="rounded-xl text-base bg-transparent"
                    >

                    </select>
                </Label>
            </div>
        </form>
    )

}

export default ChangeVideoLocation;