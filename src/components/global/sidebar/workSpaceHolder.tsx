import react from "react";
import { cn } from "@/lib/utils";

type props = {
    children: React.ReactNode;
};

const WorkSpaceholder = ({ children }: props) => {
    return (
        <span className="bg-[#545454] flex items-center font-bold justify-center w-8 px-2 h-7 rounded-sm text-[#1D1D1D]">
        {children}
      </span>
    );
};
export default WorkSpaceholder;