import React from "react";

type Props = {
 author:string;
 videoId:string;
};

const Activities = ({ author, videoId }: Props) => {
    return (
        <div>
            <h1>Activities</h1>
            <p>Author: {author}</p>
            <p>Video ID: {videoId}</p>
        </div>


    );
};  

export default Activities;

