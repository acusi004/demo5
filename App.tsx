

import React from 'react';

import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import { DemoResponse } from "./DemoResponse.tsx";
import { DemoButton } from "./DemoButton.tsx";
import CutomMp3 from "./CutomMp3.tsx";
import { Provider } from "react-redux";
import { store } from "./store.tsx";



const includeExtra = true;


function App(): React.JSX.Element {

  const [response, setResponse] = React.useState<any>(null);
  // @ts-ignore
  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  return (

    <Provider store={store}>
      <SafeAreaView style={styles.container}>

        <ScrollView>
          {response?.assets &&
            response?.assets.map(({uri}: {uri: string}) => (
              <View key={uri} style={styles.imageContainer}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={styles.image}
                  source={{uri: uri}}
                />
              </View>
            ))}
          <View style={styles.buttonContainer}>
            {actions.map(({title, type, options}) => {
              return (
                <DemoButton
                  key={title}
                  onPress={() => onButtonPress(type, options)}>
                  {title}
                </DemoButton>
              );
            })}
          </View>



          <CutomMp3/>
        </ScrollView>
      </SafeAreaView>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
    width: 200,
    height: 200,

    alignSelf:'center'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius:100
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Chụp ảnh',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Chọn ảnh từ thư viện',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },


];



export default App;
