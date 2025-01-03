import {z} from 'zod';

export const createCommentschema = z.object({
  comment: z.string().min(1,{message:"Comment is required"}),
});