import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import { EditScreenProps } from '../../App';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Colour, Note } from '../../Models/GlobalState';
import Header from './Header';
import styles from './styles';
import ColourPicker from './ColourPicker';
import useGlobalContext from '../../Models/GlobalContext';

const EditScreen: React.FC<EditScreenProps> = ({ navigation, route }) => {
	const [note, setNote] = useState<Note>(route.params.note);
	const [colourPickerVisible, setColourPickerVisible] = useState<boolean>(false);
	
	const {state,dispatcher} = useGlobalContext();

	const onBackPressed = () => {
		// console.log('Back button pressed');	
		navigation.goBack();
	}

	const onPressColourPicker = () => {
		//Open colour picking modal
		console.log('Pressed colour picker button');
		setColourPickerVisible(true);
	}

	const onColourSelected = (colour: Colour) => {
		console.log(`Selected colour: ${colour.label}`);
		setNote({...note,colour: colour});
	}

	const onPressSave = () => {
		//Save the note and call navigation.goBack()
		console.log('Pressed save button');
		dispatcher({type: 'NOTE_UPDATE', payload: note});
	}

	return (
		<SafeAreaView style={[styles.edit, { backgroundColor: note.colour.hexcode }]}>
			<Header 
				title='Edit Note' 
				onBackPress={onBackPressed} 
				onPressColourPicker ={onPressColourPicker}
				onPressSave ={onPressSave}
			/>

			<ColourPicker 
				modalVisible={colourPickerVisible} 
				setModalVisible={setColourPickerVisible} 
				pickedColour={note.colour}
				onColourSelected={onColourSelected}
			/>

			<View style={styles.edit__title}>
				<TextInput
					defaultValue={note.title}
					placeholder='Title'
					onChangeText={(text) => {
						setNote({ ...note, title: text })
					}}
					style={styles.edit__title__input}
				/>
			</View>
			<ScrollView>
				<View style={styles.edit__text}>
					<TextInput
						multiline
						defaultValue={note.text}
						placeholder='Edit your note'
						onChangeText={(text) => {
							setNote({ ...note, text: text })
						}}
						style={styles.edit__text__input}
					/>
				</View>
				<View>
					<Text>{note.id}</Text>
					<Text>{note.title}</Text>
					<Text>{note.text}</Text>
					<Text>{note.creation_date}</Text>
					<Text>{note.updation_date}</Text>
					<Text>{note.colour.label + " " + note.colour.hexcode}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default EditScreen