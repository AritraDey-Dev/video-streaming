import CommentForm from "@/components/form/comment-form";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

type Props = {
 author:string;
 videoId:string;
};

const Activities = ({ author, videoId }: Props) => {
    return (
 <TabsContent
 value="Activitiy"
 className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-6">
<CommentForm author={author} videoId={videoId} />
</TabsContent>


    );
};  

export default Activities;

