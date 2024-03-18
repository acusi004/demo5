import React, { useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrackPlayer, {
  Event,
  State,
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents
} from "react-native-track-player";
import SongSlider from "./SongSlider.tsx";

const MyPlayer: React.FC = () => {
  const playBackState = usePlaybackState()
  React.useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
      if (state === State.Playing) {
        // Update UI accordingly
      } else {
        // Update UI accordingly
      }
    });
  }, []);
  var track1 = {
    id: 1,
    artWord:require('./image/Screenshot 2024-02-08 225404.png'),
    url: require('./music/SauLoiTu.mp3'), // Load media from the network
    title: 'sau loi tu khuoc',
    duration: 402 // Duration in seconds
  };

  const track2 = {

    id: 2,
    artWord:require('./image/Screenshot 2024-02-26 211045.png'),
    url: require('./music/MoiKhiToiNhamM.mp3'), // Load media from the app bundle
    title: ' Moi khi toi nham mat',
    duration: 166
  };

  const track3 = {
    id: 3,
    artWord:require('./image/Screenshot 2024-01-10 193950.png'),
    url: require('./music/NoiNayCoAnh.mp3'), // Load media from the file system
    title: 'Noi nay co anh',
    duration: 411
  };
  const track4 = {
    id: 4,
    artWord:require('./image/Screenshot 2024-01-10 193950.png'),
    url: require('./music/ThienThuSonHa.mp3'), // Load media from the file system
    title: 'Thien thu son ha',
    duration: 411
  }
  const playSong = async (playback:State) => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.reset();
    await TrackPlayer.add([track1,track2,track3,track4]);

    const  currentTrack = await TrackPlayer.getCurrentTrack()

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play()
      } else {
        await TrackPlayer.pause()
      }
    }
    await TrackPlayer.play();
  };



  const pause = () => {
    TrackPlayer.pause();
  };

  const skipToNext = () => {
    TrackPlayer.skipToNext();
  };

  const skipToPrevious = () => {
    TrackPlayer.skipToPrevious();
  };

  const { position,duration } = useProgress(200);
  const [trackTitle, setTrackTitle] = useState<string>();
  const [trackArtWord, setTrackArtWord] = useState<string>();

  function format(seconds) {
    let mins = (parseInt(String(seconds / 60))).toString().padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title} = track || {};
      setTrackTitle(title);
    }
  });





  return (

    <View style={style.container}>
      <Text style={{color:'black', fontSize:20, alignSelf:'center', marginBottom:10}}>{trackTitle}</Text>
      <SongSlider/>
      <View style={{flexDirection:'row', alignSelf:'center', marginTop:20}}>
        <TouchableOpacity onPress={skipToPrevious}>
          <Image style={{ width: 40, height: 40 }} source={require('./image/previous.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => playSong(playBackState)}>
          <Image style={{ width: 40, height: 40, marginLeft: 20, marginRight: 20 }}
                 source={require('./image/pause.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext}>
          <Image style={{ width: 40, height: 40 }} source={require('./image/next-button.png')} />
        </TouchableOpacity>
      </View>
    </View>

  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf:'center'
  },
})

export default MyPlayer;
