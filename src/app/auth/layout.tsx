import React from "react";

type Props = {
    children: React.ReactNode
}

export default function Layout(props: Props) {
    return (
        <div className="h-screen flex justify-center items-center container">
            {props.children}
        </div>
    )
}