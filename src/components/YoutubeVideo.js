import YoutubePlayer from "react-native-youtube-iframe";
import {useCallback, useState} from "react";
import {Alert} from "react-native";

const YoutubeVideo = () => {
    const [playing, setPlaying] = useState(false);
    return (
        <YoutubePlayer
            height={200}
            play={playing}
            videoId={"F3Vj3QgANxQ"}
        />
    )
}
export default YoutubeVideo;
