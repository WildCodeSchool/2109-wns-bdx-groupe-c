import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';

import VARIABLES from './assets/styles/_variables';

import Navigation from './assets/components/_all/organisms/Navigation';

const App = () => (
  <PaperProvider>
    <StatusBar backgroundColor={VARIABLES.clrBgDark}/>
    <Navigation></Navigation>
  </PaperProvider>
);

export default App;