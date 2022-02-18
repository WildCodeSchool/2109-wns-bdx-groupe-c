import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './src/Home';
import { API_URL } from "@env"


// Initialize Apollo Client
const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();

const App = () => (
  <ApolloProvider client={client}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Project" component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);

export default App;