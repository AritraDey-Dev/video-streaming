import React from "react";
import { SignIn } from "@clerk/nextjs";

type Props = {}

export default function Page(props: Props) {
    return (
        <SignIn />
    )
}