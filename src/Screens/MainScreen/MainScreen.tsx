import React from 'react';
import { SafeAreaView, Text, View, ScrollView, FlatList } from 'react-native';
import useGlobalContext from '../../Models/GlobalContext';
import Header from './Header';
import NoteCard from './Note';
import styles from './Styles';
import navigation, { useNavigation } from '@react-navigation/native';
import { Note } from '../../Models/GlobalState';
import { MainScreenProps } from '../../App';


const MainScreen: React.FC<MainScreenProps> = ({navigation,route}) => {
	const global = useGlobalContext();

	const handlerOnClick = (note: Note) => {
		console.log('Pressed ' + note.title);
		navigation.navigate('Edit',{note: note});
	};

	return (<SafeAreaView style={styles.main}>
		<Header />
		<FlatList
			style={styles.main__body}
			data={global.state.notes.filter(n => true)}
			renderItem={({ item }) => <NoteCard note={item} onClick={handlerOnClick} />}
			keyExtractor={(item) => item.id} />
	</SafeAreaView >);
};

export default MainScreen;