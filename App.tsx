import React, { useReducer, createContext } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { GlobalContextProvider } from './Models/GlobalContext';
import MainScreen from './Screens/MainScreen/MainScreen';

/*const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
}; */

const App: React.FC = () => {

  return (
    <GlobalContextProvider>
      {/* <PaperProvider> */}
        <MainScreen />
      {/* </PaperProvider> */}
    </GlobalContextProvider>
  );
};

export default App;
