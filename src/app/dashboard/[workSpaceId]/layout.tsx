import { getNotifications, onAuthenticateUser } from "@/actions/user";
import { getAllUserVideos, getWorkspaceFolders, getWorkspaces, verifyAccessToWorkspace } from "@/actions/workspace";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";
import Sidebar from "@/components/global/sidebar";
import GlobalHeader from "@/components/global/global-header";

type Props = {
    params: {
        workSpaceId: string;
    };
    children: React.ReactNode;
};

export default async function Layout({ params: { workSpaceId }, children }: Props) {
    const auth = await onAuthenticateUser();
    if (!auth.user?.workspace || auth.user.workspace.length === 0) {
        redirect('/auth/sign-in');
        return; 
    }

    const hasAccess = await verifyAccessToWorkspace(workSpaceId);
    
    // Ensure we handle the case where the user is not authorized
    if (hasAccess.status === 200 && auth.user.workspace[0].id !== workSpaceId) {
        redirect(`/dashboard/${auth.user.workspace[0].id}`);
        return; 
    }

    if (!hasAccess.data?.workspace) {
        return null; 
    }

    const query = new QueryClient();
    await query.prefetchQuery({
        queryKey: ['workSpace-folders'],
        queryFn: () => getWorkspaceFolders(workSpaceId),
    });
    await query.prefetchQuery({
        queryKey: ['workSpace-videos'],
        queryFn: () => getAllUserVideos(workSpaceId),
    });
    await query.prefetchQuery({
        queryKey: ['workSpaces'],
        queryFn: () => getWorkspaces(),
    });
    await query.prefetchQuery({
        queryKey: ['notifications'], // Corrected queryKey to be unique
        queryFn: () => getNotifications(),
    });

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen w-screen">
                <Sidebar actionWorkspaceId={workSpaceId} />
                <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden"> 
                   <GlobalHeader workspace={hasAccess.data?.workspace} />
                   <div className="mt-4">{children}</div>
                    </div>
            </div>
        </HydrationBoundary>
    );
}
