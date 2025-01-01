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
                    className="capitalize text-base data-[slate-active]:bg-[#1D1D1D] data-[slate-active]:text-[#707070] px-4 py-2 text-center text-[#BDBDBD]">
                        {trigger}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs> 
)
}

export default TabMenu;