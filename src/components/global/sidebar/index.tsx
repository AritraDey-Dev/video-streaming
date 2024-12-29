"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getWorkspaces } from '@/actions/workspace';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname, useRouter  } from 'next/navigation';
import react from 'react';
import { useDispatch } from 'react-redux';
import { useQueryData } from "@/hooks/useQueryData";
import { Separator } from "@radix-ui/react-select";
import { NotificaiionProps, workspaceProps } from "@/types/index.type";
import Modal from "../modal";
import { Menu, PlusCircle} from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import Link from "next/link";
import SideBarItem from "./sideBarItem";
import { getNotifications } from "@/actions/user";
import WorkSpaceholder from "./workSpaceHolder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "../infobar";
import { WORKSPACES } from "@/redux/slices/workspaces";

type props={
    actionWorkspaceId: string;
}

const Sidebar = ({actionWorkspaceId}: props) => {
  // console.log(actionWorkspaceId)
  const router=useRouter();
  const pathName=usePathname();
const dispatch=useDispatch();
  const menuItems=MENU_ITEMS(actionWorkspaceId);
  const {data,isFetched}=useQueryData(['workSpaces'],()=>getWorkspaces())
  const { data: workspace } = data as workspaceProps
  // console.log(workspace)
  const onChangeActiveWorkspace=(value:string)=>{
    router.push(`/dashboard/${value}`)
  }

 if (isFetched && workspace) {
 dispatch(WORKSPACES({workspaces:workspace.workspace}))
}

  const {data:notifications}=useQueryData(['notifications'],()=>getNotifications())
  const {data:count}=notifications as NotificaiionProps
  const SideBarSection=()=>(
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image
          src="/opal-logo.svg"
          height={40}
          width={40}
          alt="logo"
        />
        <p className="text-2xl">Opal</p>
         </div>
        <Select defaultValue={actionWorkspaceId}
        onValueChange={onChangeActiveWorkspace} 
        >
      <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
        <SelectValue placeholder="Select a workspace" />
      </SelectTrigger >
      <SelectContent className="bg-[#111111] backdrop-blur-xl">
        <SelectGroup>
          <SelectLabel>Workspaces</SelectLabel>
          <Separator />
          {workspace.workspace?.map((workspace) => (
              <SelectItem
                value={workspace.id}
                key={workspace.id}
              >
                {workspace.name}
              </SelectItem>
            ))}
          {workspace.members.length > 0 &&
              workspace.members?.map(
                (workspace) =>
                  //@ts-ignore
                  workspace.workSpace && (
                    <SelectItem
                    //@ts-ignore
                      value={workspace.workSpace.id}
                      //@ts-ignore
                      key={workspace.workSpace.id}
                    >
                   
                      {workspace.workSpace.name}
                    </SelectItem>
                  )
              )}
            
          
        </SelectGroup>
      </SelectContent>
    </Select>
   
    { 
    //@ts-ignore
    workspace.workspace?.type === 'PUBLIC' &&
    workspace.subscription?.plan === 'PRO'  &&
    //@ts-ignore
      (
      <Modal   trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90  hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite To Workspace
                </span>
              </span>
            }
            title="Invite To Workspace"
            description="Invite other users to your workspace" >
        <Search workspaceId={actionWorkspaceId} />
        </Modal>
        )}
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
           <SideBarItem
           href={item.href}
           title={item.title}
           icon={item.icon}
           notifications={item.title==='Notifications'
            &&
            count?._count &&
            count?._count.notification || 0
           }
           selected={item.href === pathName}
          
           />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4">WorkSpaces</p>
      {workspace.workspace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#3c3c3c] font-medium text-sm">
            {workspace.subscription?.plan === 'FREE'
              ? 'Upgrade to create workspaces'
              : 'No Workspaces'}
          </p>
        </div>
      )}

      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspace.length>0 &&
          workspace.workspace?.map((item) => (
           ( item.type !== 'PERSONAL' &&
              <SideBarItem
              href={`/dashboard/${item.id}`}
              selected={pathName===`/dashboard/${item.id}`}
              title={item.name}
              notifications={0}
              key={item.name}
              icon={<WorkSpaceholder>{item.name.charAt(0)}</WorkSpaceholder>}
              />
            )
          ))}
             {workspace?.members.length > 0 &&
            workspace?.members.map((item) => (
              <SideBarItem
                href={`/dashboard/${item.workSpace.id}`}
                selected={pathName === `/dashboard/${item.workSpace.id}`}
                title={item.workSpace.name}
                notifications={0}
                key={item.workSpace.name}
                icon={
                  <WorkSpaceholder>
                    {item.workSpace.name.charAt(0)}
                  </WorkSpaceholder>
                }
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />

      {workspace.subscription.plan === 'FREE' && (
        <GlobalCard
          title="Upgrade to Pro"
          description=" Unlock AI features like transcription, AI summary, and more."
        footer={<Button className="text-sm w-full"><Loader>Upgrade</Loader></Button>}
        />
      )}
      </div>
      
     )
  return (
    <div className="full">
      <InfoBar/>
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger
            asChild
            className="ml-2"
          >
            <Button
              variant={'ghost'}
              className="mt-[2px]"
            >
              <Menu/>
            </Button>
          </SheetTrigger>
          <SheetContent
            side={'left'}
            className="p-0 w-fit h-full"
          >
            <SideBarSection/>
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full"><SideBarSection/></div>
    </div>
  )

}

export default Sidebar;