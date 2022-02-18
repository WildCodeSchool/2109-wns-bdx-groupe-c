import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Tasks from './src/Task/Tasks';
import Task from './src/Task/Task';
import { API_URL } from "@env"


// Initialize Apollo Client
const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

const App = () => (
  <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="Task" component={Task} />
      </Stack.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);

export default App;