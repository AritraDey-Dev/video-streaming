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
  export const getWorkspaceFolders = async (workSpaceId: string) => {
    try {
      const isFolders = await db.folder.findMany({
        where: {
          workSpaceId,
        },
        include: {
          _count: {
            select: {
              videos: true,
            },
          },
        },
      })
      if (isFolders && isFolders.length > 0) {
        return { status: 200, data: isFolders }
      }
      return { status: 404, data: [] }
    } catch (error) {
      return { status: 403, data: [] }
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


export const createWorkspaces=async(name:string)=>{
  try{
    const user=await currentUser();
    if(!user) return {status:404,data:null}
    const authorized=await db.user.findUnique({
      where:{
        clerkid:user.id,
      },
      select:{
        subscription:{
          select:{
            plan:true,
          }
        },
      }

    })

    if (authorized?.subscription?.plan === 'PRO') {
      const workspace = await db.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: 'PUBLIC',
            },
          },
        },
      })
      if (workspace) {
        return { status: 201, data: 'Workspace Created' }
      }
    }
    return {
      status: 401,
      data: 'You are not authorized to create a workspace.',
    }
  }catch(e){
    console.log(e)
  }
       
  }

  export const renameFolders=async(folderId:string,name:string)=>{
    try{
      const folder=await db.folder.update({
        where:{
          id:folderId,
        },
        data:{
          name,
        }
      })
      if(folder) return {status:200,data:folder}
      return {status:404,data:null}
    }catch(e){
        return {
          status: 400,
          data: null,
        }
    }
  }

  export const createFolder=async(workSpaceId:string)=>{
    try{
      const folder=await db.workSpace.update({
        where:{
          id:workSpaceId,
        },
        data:{
          folders:{
            create:{
              name:'Untitled',
              createdAt:new Date().toISOString(),
            }
          }
      }

    })
    if(folder) return {status:200,message:"New folder created"}
    return {status:404,message:"Could not create folder"}
    }catch(e){
        return {
          status: 400,
          data: null,
        }
    }
  }



  export const getFolderInfo=async(folderId:string)=>{
    try{
      const folder=await db.folder.findUnique({
        where:{
          id:folderId,
        },
        select:{
          name:true,
          _count:{
            select:{
              videos:true,
            }
          }
        }
      })
      if(folder) return {status:200,data:folder}
      return {status:404,data:null}
    }catch(e){
        return {
          status: 400,
          data: null,
        }
    }   
  }

  export const moveVideoLocation=async(videoId:string,
    workspaceId:string,
  folderId:string)=>{

    try{
        const location=await db.video.update({
            where:{
                id:videoId,
            },
            data:{
                folderId:folderId || null,
                workSpaceId:workspaceId,
            }
        })
        if(location) return {status:200,message:"Video location updated"}
        return {status:404,message:"Could not update video location"}
    }catch(e){
      return {status:404,message:"error"}
    }
  }