import React, { createContext, useContext, useReducer } from "react";
import { Text } from "react-native";
import { Action, GlobalReducer } from "./GlobalReducer";
import GlobalState, { initState } from "./GlobalState";

export type GlobalContextType = {
	state: GlobalState;
	dispatcher: React.Dispatch<Action>;
};

const GlobalContext = createContext<GlobalContextType>({ state: initState, dispatcher: (v) => { } });

const useGlobalContext = () => {
	return useContext(GlobalContext);
}

export const GlobalContextProvider = ({ children }: { children: JSX.Element }) => {
	
	const [globalState, globalDispatcher] = useReducer(GlobalReducer, initState);
	
	
	return (
		<GlobalContext.Provider value={{state: globalState,dispatcher:globalDispatcher }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default useGlobalContext;