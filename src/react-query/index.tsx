"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const client=new QueryClient();
type Props={children:React.ReactNode}
const ReactQueryProvider = (props: Props) => {
    return (
    <QueryClientProvider  client={client}>{props.children}
    </QueryClientProvider>
    )
}
export default ReactQueryProvider;