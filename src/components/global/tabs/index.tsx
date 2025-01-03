import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
    triggers: string[],
    children: React.ReactNode,
    defaultValue: string
}

const TabMenu = ({ triggers, children, defaultValue }: Props) => {
    return (
        <Tabs defaultValue={defaultValue}
            className="w-full">
            <TabsList className="flex justify-center bg-trabsparent">
                {triggers.map((trigger) => (
                    <TabsTrigger key={trigger} value={trigger}
                    className="capitalize text-base  data-[state=active]:bg-[#1D1D1D] text-center text-[#BDBDBD]">
                        {trigger}
                    </TabsTrigger>
                ))}
            </TabsList>
            {children}
        </Tabs> 
)
}

export default TabMenu;