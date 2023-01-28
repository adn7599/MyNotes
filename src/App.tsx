import React, { useReducer, createContext } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { GlobalContextProvider } from './Models/GlobalContext';
import MainScreen from './Screens/MainScreen/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import EditScreen from './Screens/EditScreen/EditScreen';
import { Note } from './Models/GlobalState';
/*const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
}; */

type StackParamList = {
  Main: undefined, 
  Edit: {
    note: Note;
  }
};
const Stack = createNativeStackNavigator<StackParamList>();
export type MainScreenProps = NativeStackScreenProps<StackParamList,'Main'>;
export type EditScreenProps = NativeStackScreenProps<StackParamList,'Edit'>;

const App: React.FC = () => {

  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}}
          initialRouteName='Main'
        >
          {/* <PaperProvider> */}
          <Stack.Screen
            name="Main"
            component={MainScreen}
          />
          <Stack.Screen
            name="Edit"
            component={EditScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
};

export default App;
