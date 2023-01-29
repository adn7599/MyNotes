import React from 'react';
import { SafeAreaView, Text, View, ScrollView, FlatList } from 'react-native';
import useGlobalContext from '../../Models/GlobalContext';
import Header from './Header';
import NoteCard from './Note';
import styles from './Styles';
import navigation, { useNavigation } from '@react-navigation/native';
import { Colours, createNote, Note } from '../../Models/GlobalState';
import { MainScreenProps } from '../../App';
import FloatingActionButtion from './FloatingActionButtion';


const MainScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
	const global = useGlobalContext();

	const handlerOnClick = (note: Note) => {
		console.log('Pressed ' + note.title);
		navigation.navigate('Edit', { note: note, mode: 'edit' });
	};

	const handlerAddNote = () => {
		navigation.navigate('Edit', { mode: 'add', note: createNote("", "", Colours[0]) });
	}

	const notes = global.state.notes.filter(n => n.isVisible);
	const noteDivs: React.ReactElement[] = [];

	for (let i = 0; i < notes.length; i = i + 2) {
		noteDivs.push(
			<View key={notes[i].id} style={styles.main__body__noteDiv}>
				<NoteCard note={notes[i]} onClick={handlerOnClick} />
				{i + 1 < notes.length ? <NoteCard note={notes[i+1]} onClick={handlerOnClick} /> 
				: 
				<View style={styles.main__body__noteCard}></View>}
			</View>
		);
	}

	return (<SafeAreaView style={styles.main}>
		<Header />
		<FloatingActionButtion onClickHandler={handlerAddNote} />
		<ScrollView
			style={styles.main__body}
		>
			{noteDivs}
		</ScrollView>
		{/* <FlatList
			style={styles.main__body}
			data={noteDivs}
			renderItem={({ item }) => <item />}
			keyExtractor={(item,index) => noteIds[index]} /> */}
	</SafeAreaView >);
};


export default MainScreen;