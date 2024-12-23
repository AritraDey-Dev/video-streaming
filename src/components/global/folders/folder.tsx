"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loader from "../loader";
import FolderDuotone from "@/components/icons/folder-duotone";
import { useMutationData, useMutationDataState } from "@/hooks/useMutationData";
import { renameFolders } from "@/actions/workspace";
import { Input } from "@/components/ui/input";

type Props = {
    name: string;
    id: string;
    optimistic?: boolean;
    count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {
    const pathName = usePathname();
    const router = useRouter();
    const [rename, setRename] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const folderCardRef = useRef<HTMLDivElement | null>(null);

    const handleClick = () => {
        router.push(`${pathName}/folder/${id}`);
    };

    const handleDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();
        setRename(true);
    };

    const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
        if (inputRef.current) {
            if (inputRef.current.value.trim()) {
                mutate(
                    { name: inputRef.current.value.trim(), id },
                    {
                        onSuccess: () => setRename(false),
                        onError: () => setRename(false),
                    }
                );
            } else {
                setRename(false);
            }
        }
    };

    const { isPending, mutate } = useMutationData(
        ["rename-folder"],
        (data: { name: string }) => renameFolders(id, data.name),
        false,
        "workspace-folders",
        () => setRename(false)
    );
    const {latestVariables}=useMutationDataState(['rename-folder'])
    return (
        <div
            onClick={handleClick}
            className={cn(
                optimistic && "opacity-60",
                "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]"
            )}
            ref={folderCardRef}
        >
            <Loader state={isPending}>
                <div className="flex flex-col gap-[1px]">
                    {rename ? (
                        <Input
                            defaultValue={name}
                            onBlur={updateFolderName}
                            autoFocus
                            className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
                            ref={inputRef}
                        />
                    ) : (
                        <p
                            onClick={(e) => e.stopPropagation()}
                            className="text-neutral-300"
                            onDoubleClick={handleDoubleClick}
                        >
                            {latestVariables && 
                            latestVariables.status==='pending' &&
                            latestVariables.variables.id===id ?
                            latestVariables.variables.name:name}
                        </p>
                    )}
                    <span className="text-sm text-neutral-500">
                        {count || 0}
                    </span>
                </div>
            </Loader>
            <FolderDuotone />
        </div>
    );
};

export default Folder;
