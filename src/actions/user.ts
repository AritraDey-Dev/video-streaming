'use server'
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server'
import { SubscriptIcon } from 'lucide-react';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string);
export const onAuthenticateUser = async () => {
    try {
      const user = await currentUser()
      if (!user) {
        return { status: 403 }
      }
  
      const userExist = await db.user.findUnique({
        where: {
          clerkid: user.id,
        },
        include: {
          workspace: {
            where: {
              User: {
                clerkid: user.id,
              },
            },
          },
        },
      })
      if (userExist) {
        return { status: 200, user: userExist }
      }
      
      const newUser = await db.user.create({
        data: {
          clerkid: user.id,
          email: user.emailAddresses[0].emailAddress,
          firstname: user.firstName,
          lastname: user.lastName,
          image: user.imageUrl,
          studio: {
            create: {},
          },
          subscription: {
            create: {},
          },
          workspace: {
            create: {
              name: `${user.firstName}'s Workspace`,
              type: 'PERSONAL',
            },
          },
        },
        include: {
          workspace: {
            where: {
              User: {
                clerkid: user.id,
              },
            },
          },
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      })
      if (newUser) {
        return { status: 201, user: newUser }
      }
      return { status: 400 }
    } catch (error) {
      console.log('🔴 ERROR', error)
      return { status: 500 }
    }
  }
  
  export const getNotifications=async()=>{
    try{
      const user=await currentUser();
      if(!user) return {status:403,data:null}
      const notifications=await db.user.findUnique({
        where:{
          clerkid:user.id,
        },
        select:{
          notification:true,
           _count:{
            select:{
              notification:true,
            }
           }
          
        }
      })
    if(notifications && notifications.notification.length>0){
      return {status:200,data:notifications}
    }
    return {status:404,data:null}
    }catch(error){
      return {
        status:500,
        data:null,
      }
    }
  }

  export const searchUsers = async (query: string) => {
    try {
      const user = await currentUser()
      if (!user) return { status: 404 }
  
      const users = await db.user.findMany({
        where: {
          OR: [
            { firstname: { contains: query } },
            { email: { contains: query } },
            { lastname: { contains: query } },
          ],
          NOT: [{ clerkid: user.id }],
        },
        select: {
          id: true,
          subscription: {
            select: {
              plan: true,
            },
          },
          firstname: true,
          lastname: true,
          image: true,
          email: true,
        },
      })
  
      if (users && users.length > 0) {
        return { status: 200, data: users }
      }
  
      return { status: 404, data: undefined }
    } catch (error) {
      return { status: 500, data: undefined }
    }
  }
  
export const  getPaymentInfo=async()=>{
  try {
    const user=await currentUser()
    if(!user) return {status:403,data:null}

    const payment=await db.user.findUnique({
      where:{
        clerkid:user.id,
      },
      select:{
        subscription:{
          select:{
           plan:true,
        }
      }
      },
    })
    if(payment){
      return {status:200,data:payment}
    }

  } catch (error) {
    return {
      status:500,
      data:null,
    }
  }

}

export const getFirstView = async () => {
try {
  const user = await currentUser()
  if (!user) return { status: 403 }
  const userData = await db.user.findUnique({
    where: {
      clerkid: user.id,
    },
    select: {
      firstView: true,
    },
  })
  if (userData) {
    return { status: 200, data: userData.firstView }
  }
  return { status: 404, data: null }
} catch (error) {
  return {
    status: 500,
    data: null,
  }
}
}

export const enableFirstView = async (state: boolean) => {
  try {
    const user = await currentUser()

    if (!user) return { status: 404 }

    const view = await db.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        firstView: state,
      },
    })

    if (view) {
      return { status: 200, data: 'Setting updated' }
    }
  } catch (error) {
    return { status: 400 }
  }
}

export const createCommentAndReply = async (
  userId: string,
  comment: string,
  videoId: string,
  commentId?: string | undefined
) => {
  try {
    if (commentId) {
      const reply = await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          reply: {
            create: {
              comment,
              userId,
              videoId,
            },
          },
        },
      })
      if (reply) {
        return { status: 200, data: 'Reply posted' }
      }
    }

    const newComment = await db.video.update({
      where: {
        id: videoId,
      },
      data: {
        Comment: {
          create: {
            comment,
            userId,
          },
        },
      },
    })
    if (newComment) return { status: 200, data: 'New comment added' }
  } catch (error) {
    return { status: 400 }
  }
}

export const getUserProfile = async () => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }
    const profileIdAndImage = await db.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        image: true,
        id: true,
      },
    })

    if (profileIdAndImage) return { status: 200, data: profileIdAndImage }
  } catch (error) {
    return { status: 400 }
  }
}


export const getVideoComments = async (Id: string) => {
  try {
    const comments = await db.comment.findMany({
      where: {
        OR: [{ videoId: Id }, { commentId: Id }],
        commentId: null,
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
    })

    return { status: 200, data: comments }
  } catch (error) {
    return { status: 400 }
  }
}

export const completeSubscription = async (session_id: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }

    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session) {
      const customer = await db.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          subscription: {
            update: {
              data: {
                customerId: session.customer as string,
                plan: 'PRO',
              },
            },
          },
        },
      })
      if (customer) {
        return { status: 200 }
      }
    }
    return { status: 404 }
  } catch (error) {
    return { status: 400 }
  }
}