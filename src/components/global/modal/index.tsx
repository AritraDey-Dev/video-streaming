import { AlertDialogDescription, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

type Props = {
  children: React.ReactNode,
  title: string,
  trigger: React.ReactNode,
  description: string,
  className?: string
}


const Modal = ({ children, description, title, trigger, className }: Props) => {
    return (
      <Dialog>
        <DialogTrigger
          className={className}
          asChild
        >
          {trigger}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

export default Modal
