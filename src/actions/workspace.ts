'use server'

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
    try {
      const user = await currentUser()
      if (!user) return { status: 403 }
  
      const isUserInWorkspace = await db.workSpace.findUnique({
        where: {
          id: workspaceId,
          OR: [
            {
              User: {
                clerkid: user.id,
              },
            },
            {
              members: {
                every: {
                  User: {
                    clerkid: user.id,
                  },
                },
              },
            },
          ],
        },
      })
      return {
        status: 200,
        data: { workspace: isUserInWorkspace },
      }
    } catch (error) {
      return {
        status: 403,
        data: { workspace: null },
      }
    }
  }
export const getWorkspaceFolders=async(workSpace:string)=>{
  try{
    const folders=await db.folder.findMany({
      where:{
        workSpaceId:workSpace,
      },
      include:{
        _count:{
          select:{
            videos:true,
          }
        }
      }
    })
    if(folders && folders.length>0) return {status:200,data:folders}
    return {status:404,data:null}
  }catch(error){
    return {
      status:500,
      data:null,
    }
  }
}
export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 404 }
    const videos = await db.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    if (videos && videos.length > 0) {
      return { status: 200, data: videos }
    }

    return { status: 404 }
  } catch (error) {
    return { status: 400 }
  }
}
export const getWorkspaces=async()=>{
  try{
    const user=await currentUser();
    if(!user) return {status:404,data:null}
    const workspaces=await db.user.findUnique({
      where:{
        clerkid:user.id,
      },
      select:{
        subscription:{
          select:{
            plan:true,
          }
        },
        workspace:{
          select:{
            id:true,
            name:true,
            type:true,
          }
        },
        members:{
          select:{
            WorkSpace:{
              select:{
                id:true,
                name:true,
                type:true,
              }
            }
          }
        }

      }
    })
    if(workspaces) return {status:200,data:workspaces}
  }
  catch(error){
    return {
      status:500,
      data:null,
    }
  }
}
