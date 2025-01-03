import { useVideo } from "@/hooks/usevideo";
import React from "react";
import { Send, X } from 'lucide-react'
import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
type Props = {
    videoId: string;
    author: string;
    commentId?: string;
    close?: () => void;
};

const CommentForm = ({ videoId, author,commentId,close }: Props) => {
    const {errors,onFormSubmit,register,isPending}=useVideo(videoId,commentId)
    return (
<form className="relative w-full" onSubmit={onFormSubmit}>
    {/* <X 
    onClick={close}
    size={18}
    className="absolute
     right-3 top-3
      text-white/50
       hover:text-white/80"/> */}

<FormGenerator
        register={register}
        errors={errors}
        placeholder={`Respond to ${author}...`}
        name="comment"
        inputType="input"
        lines={8}
        type="text"
      />
            <Button
        className="p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent "
        type="submit"
      >
        <Loader state={isPending}>
          <Send
            className="text-white/50 cursor-pointer hover:text-white/80"
            size={18}
          />
        </Loader>
      </Button>
</form>
    );
};  

export default CommentForm;