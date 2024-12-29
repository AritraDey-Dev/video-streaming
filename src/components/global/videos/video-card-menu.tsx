// "use client";
import React from "react";
import Modal from "../modal";
import { Move } from "lucide-react";
import ChangeVideoLocation from "@/components/form/change-video-location";

type Props = {
  videoId: string;
  currentWorkspace: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const VideoCardMenu = ({ videoId,
  currentWorkspace,
  currentFolder,
  currentFolderName }
  : Props) => {
    console.log("currentFolderName",currentFolderName)
    console.log("currentFolder",currentFolder)
    console.log("currentWorkspace",currentWorkspace)
    console.log("videoId",videoId)
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2"
      title="Move to new Workspace/Folder"
      description="This action cannot be undone. This will permanently delete your
  account and remove your data from our servers."
      trigger={
        <Move
          size={20}
          fill="#4f4f4f"
          className="text-[#4f4f4f]"
        />
      }
    >
      <ChangeVideoLocation
        videoId={videoId}
        currentWorkspace={currentWorkspace}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName} />
    </Modal>
  )

}

export default VideoCardMenu;