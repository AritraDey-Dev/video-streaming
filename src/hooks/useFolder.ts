import { useAppSelector } from "@/redux/store"
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace";
import { useForm } from "react-hook-form";
import { moveVideoSchema } from "@/components/form/change-video-location/schema";
import useZodForm from "./useZodForm";

export const useMoveVideos = (videoId: string, currentWorkspace: string, currentFolder?: string, currentFolderName?: string) => {

    const { folders } = useAppSelector((state) => state.FolderReducer)
    const { workspaces } = useAppSelector((state) => state.WorkSpaceReducer)
    const [fetching, setFetching] = useState(false);

    const [isFolders, setIsFolders] = useState<
        | ({
            _count: {
                videos: number
            }
        } & {
            id: string
            name: string
            createdAt: Date
            workSpaceId: string | null
        })[]
        | undefined
    >(undefined)


    const { mutate, isPending } = useMutationData(
        ['change-video-location'],
        (data: { folder_id: string, workspace_id: string }) => moveVideoLocation(
            videoId,
            data.workspace_id, data.folder_id),

    )
    const { errors, onFormSubmit, watch, register } = useZodForm(
        moveVideoSchema,
        mutate,
        { folder_id: null, workspace_id: currentWorkspace }
      )

      const fetchFolders = async (workspace: string) => {
        setFetching(true);
        const folders=await getWorkspaceFolders(workspace);
        setFetching(false);
        
        setIsFolders(folders.data);
      };


      useEffect(() => {
        const workspace = watch(async (value) => {
          if (value.workspace_id) fetchFolders(value.workspace_id)
        })
    
        return () => workspace.unsubscribe()
      }, [watch])

      return {
        onFormSubmit,
        errors,
        register,
        isPending,
        folders,
        fetching,
        workspaces,
        isFolders,
      }

}