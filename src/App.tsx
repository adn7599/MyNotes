import React, { useReducer, createContext } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { GlobalContextProvider } from './Models/GlobalContext';
import MainScreen from './Screens/MainScreen/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import EditScreen, { Mode } from './Screens/EditScreen/EditScreen';
import { Note } from './Models/GlobalState';
import LoginScreen from './Screens/User/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/User/RegisterScreen/RegisterScreen';
import WelcomeScreen from './Screens/User/WelcomeScreen/WelcomeScreen';
import ChangePassScreen from './Screens/User/ChangePassScreen/ChangePassScreen';
/*const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
}; */

type StackParamList = {
  Welcome: undefined,
  Register: undefined,
  Login: undefined,
  ChangePass: undefined,
  Main: undefined, 
  Edit: {
    mode: Mode;
    note: Note;
  }
};
const Stack = createNativeStackNavigator<StackParamList>();
export type WelcomeScreenProps = NativeStackScreenProps<StackParamList,'Welcome'>;
export type LoginScreenProps = NativeStackScreenProps<StackParamList,'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<StackParamList,'Register'>;
export type ChangePassScreenProps = NativeStackScreenProps<StackParamList,'ChangePass'>;
export type MainScreenProps = NativeStackScreenProps<StackParamList,'Main'>;
export type EditScreenProps = NativeStackScreenProps<StackParamList,'Edit'>;

const App: React.FC = () => {

  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}}
          initialRouteName='Welcome'
          // initialRouteName='ChangePass'
        >
          {/* <PaperProvider> */}
          <Stack.Screen 
            name='Welcome'
            component={WelcomeScreen} 
          />
          <Stack.Screen 
            name='Login'
            component={LoginScreen} 
          />
          <Stack.Screen 
            name='Register'
            component={RegisterScreen} 
          />
          <Stack.Screen 
            name='ChangePass'
            component={ChangePassScreen} 
          />
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
