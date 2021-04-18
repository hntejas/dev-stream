import {  useParams } from "react-router-dom";

export default function VideoPage(){
    const params = useParams();

    return <div>
        <iframe width="853" height="480" src={'https://www.youtube.com/embed/' + params.embedId} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
}