import { createCommentAndReply, getUserProfile } from "@/actions/user"
import { useMutationData } from "./useMutationData"
import { useQueryData } from "./useQueryData"
import useZodForm from "./useZodForm"
import { createCommentschema } from "@/components/form/comment-form/schema"

export const useVideo = (videoId:string,commentId?:string) => {
const {data}=useQueryData(['user-profile'],()=>getUserProfile())

const {status,data:user}=data as{
    status:number,
    data:{
        id:string,
        image:string,
    }
}

const { isPending, mutate } = useMutationData(
    ['new-comment'],
    (data: { comment: string }) =>
      createCommentAndReply(user.id, data.comment, videoId, commentId),
   true, 'video-comments',
    () => reset()
  )
  const { register, onFormSubmit, errors, reset } = useZodForm(
    createCommentschema,
    mutate
  )
  return { register, errors, onFormSubmit, isPending }
}