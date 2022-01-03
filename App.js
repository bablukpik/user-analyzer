import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectFilter from './src/screens/SelectFilter';
import UserGrid from './src/screens/UserGrid';
import { Provider } from 'react-redux';
import store from './src/store/store';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="SelectFilter" component={SelectFilter} />
      <Stack.Screen name="UserGrid" component={UserGrid} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>

  );
}
