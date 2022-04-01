import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar, View } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';

import VARIABLES from './assets/styles/_variables';

import Navigation from './src/components/organisms/All/Navigation';

const App = () => {

  return (
    <PaperProvider>
      <View style={{backgroundColor: VARIABLES.clrBgDark, flex: 1}}>
        <StatusBar backgroundColor={VARIABLES.clrBgDark}/>
        <Navigation></Navigation>
      </View>
    </PaperProvider>
  )
};

export default App;