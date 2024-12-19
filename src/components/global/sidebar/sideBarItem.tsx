import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type props={
    title:string,
    icon:React.ReactNode,
    href:string,
    notifications:number,
    selected:boolean
}

const SideBarItem = ({title,icon,href,notifications,selected}:props) => {

    return (
        <li className='cursor-pointer my-[5px] '>
         <Link
        href={href}
        className={cn(
          'flex items-center justify-between group rounded-lg hover:bg-[#1D1D1D]',
          selected ? 'bg-[#1D1D1D]' : ''
        )}
      >
         <div className="flex items-center gap-2 transition-all p-[5px] cursor-pointer">
            {icon}
            <span
            className={cn(
              'font-medium group-hover:text-[#9D9D9D] transition-all truncate w-32',
              selected ? 'text-[#9D9D9D]' : 'text-[#545454]'
            )}
          >
            {title}
          </span>
           {notifications > 0 && (
            <span
              className={cn(
                'absolute top-0 right-0 h-4 w-4 rounded-full bg-[#FF0000] text-xs flex items-center justify-center text-white',
                notifications > 9 ? 'bg-[#FF0000]' : 'bg-[#FFA500]'
              )}
            >
              
            </span>
          )}
          
         </div>
        </Link>
        </li>

    )
}
export default SideBarItem