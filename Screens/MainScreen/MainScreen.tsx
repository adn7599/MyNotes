import React from 'react';
import { SafeAreaView , Text,View, ScrollView} from 'react-native';
import useGlobalContext from '../../Models/GlobalContext';
import Header from './Header';
import NoteCard from './Note';
import styles from './Styles';

const MainScreen : React.FC = () => {
	
	const global = useGlobalContext();	
	return (<SafeAreaView style={styles.main}>
		<Header />
		<ScrollView style={styles.main__body}>
		{global.state.notes.map((note) => {
			return <NoteCard note={note}/>
		})}
		</ScrollView>
	</SafeAreaView>);
};

export default MainScreen;