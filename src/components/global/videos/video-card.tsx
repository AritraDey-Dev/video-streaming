'use client'
import Loader from "../loader";
import React from "react";
import VideoCardMenu from "./video-card-menu";
import CopyLink from "./copy-link";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, Share2, User } from "lucide-react";

type Props = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  processing: boolean;
  workspaceId: string;
};

const VideoCard = (Props: Props) => {
  console.log(Props)
  const dayAgo = Math.floor(
    (new Date().getTime() - new Date(Props.createdAt).getTime()) /
    (1000 * 60 * 60 * 24)
  );

  return (
    <Loader
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[rgb(37,37,37)] rounded-xl"
      state={Props.processing}
    >
      <div
        className="cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 gap-x-3  group-hover:flex">
          <VideoCardMenu
            currentFolderName={Props.Folder?.name}
            videoId={Props.id}
            currentWorkspace={Props.workspaceId}
            currentFolder={Props.Folder?.id}
          />
          <CopyLink
            className="p-[5px] h-5 bg-hover:bg-transparent bg-[#252525]"
            videoId={Props.id}
          />
        </div>
        <Link
          href={`/preview/${Props.id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          {/* Video Section */}
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${Props.source}#t=1`}
            />
          </video>

          {/* Title Section */}
          <div className="px-5 py-3 flex flex-col gap-2 z-20">
            <h2 className="text-sm font-semibold text-[#BDBDBD]">{Props.title}</h2>

            {/* User Info Section */}
            <div className="flex gap-x-2 items-center mt-4 px-5">
              <Avatar className="w-8 h-8">
                {/* Ensuring a valid image or fallback */}
                <AvatarImage src={Props.User?.image as string} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="capitalize text-xs text-[#BDBDBD]">
                  {Props.User?.firstname || "Unknown"} {Props.User?.lastname || ""}
                </p>
                <p className="text-[#6d6b6b] text-xs flex items-center">
                  <Dot /> {dayAgo === 0 ? "Today" : `${dayAgo}d ago`}
                </p>
              </div>
            </div>

            {/* Workspace Info Section */}
            <div className="mt-4 px-5">
              <span className="flex gap-x-1 items-center">
                <Share2 fill="#9D9D9D" className="text-[#9D9D9D]" size={12} />
                <p className="text-xs text-[#9D9D9D] capitalize">
                  {Props.User?.firstname || "User"}'s Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>

      </div>

    </Loader>
  );
};

export default VideoCard;
