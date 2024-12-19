import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutationData } from "@/hooks/useMutationData";
import { useSearch } from "@/hooks/useSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {  User } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";
import Loader from "../loader";

type Props = {
    workspaceId: string;
}

const Search = ({workspaceId}: Props) => {
  const { query, onSearchQuery, isFetching, onUsers } = useSearch(
    'get-users',
    'USERS'
  )
  const { mutate, isPending } = useMutationData(
    ['invite-member'],
    (data: { recieverId: string; email: string }) =>
      inviteMembers(workspaceId, data.recieverId, data.email)
  )
  return (
    <div className="flex flex-col gap-y">
      <Input onChange={onSearchQuery} 
      value={query}
       placeholder="Search for users"
       className="bg-transparent border-2 outline-none" />
      {isFetching?(
        <div className="flex flex-col gap-y-2">
          <Skeleton className="text-center text-sm text-[#a4a4a4]" />
        </div>
      ):!onUsers?(
        <p className="text-center text-sm text-[#a4a4a4]">
          No users found
        </p>
      ):(
        <div>
          {onUsers.map((user) => (
            <div key={user.id} className="flex gap-x-3 items-center border-2 w-full border-gray-700 rounded-xl p-2">
                 <Avatar>
                <AvatarImage src={user.image as string} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h3 className="text-bold text-lg capitalize">
                  {user.firstname} {user.lastname}
                </h3>
                <p className="lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]">
                  {user.subscription?.plan}
                </p>
              </div>
              <div className="flex-1 flex justify-end items-center">
              <Button
                  onClick={() =>
                    mutate({ recieverId: user.id, email: user.email })
                  }
                  //@ts-ignore
                  variant={'default'}
                  className="w-5/12 font-bold"
                >
                  <Loader
                    state={isPending}
                    color="#000"
                  >
                    Invite
                  </Loader>
                </Button>
            </div>
            </div>
          ))}
        
        </div>
      )
      }
      
    </div>
  )
}

export default Search;