"use client"
import { getNotifications } from "@/actions/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQueryData } from "@/hooks/useQueryData";
import { User } from "lucide-react";
import React from "react";

type Props = {};

const NotificationPage = (props: Props) => {
  const { data: notifications } = useQueryData(
    ['user-notifications'],
    getNotifications
  );
  
  if (!notifications) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        No notifications
      </div>
    );
  }
  // Destructure notifications
  const { data: notification, status } = notifications as {
      status: number;
      data: {
          notification: {
              id: string;
              userId: string | null;
              content: string;
            }[];
        };
    };
    

  if (status !== 200 || !notification) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3 overflow-y-auto max-h-screen">
      {notification.notification.length ? (
        notification.notification.map((n) => (
          <div
            key={n.id}
            className="border-2 flex gap-x-3 items-center rounded-lg p-3"
          >
            <Avatar>
              <AvatarFallback>
                {n.userId ? n.userId.charAt(0).toUpperCase() : <User />}
              </AvatarFallback>
            </Avatar>
            <p>{n.content}</p>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full w-full">
          No notifications
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
