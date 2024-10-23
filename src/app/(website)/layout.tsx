import React from "react";
import LandingPageNavbar from "./_components/landingPageNavbar";

type Props = {
    children: React.ReactNode
}

export default function Layout(props: Props) {
  return (
    <div className="felx felx-col py-10 px-10 xl:px-0 container">
      <LandingPageNavbar/>
      {props.children}
    </div>
  )
}