import React, { useState } from 'react'
import { EditScreenProps } from '../../App';
import { StatusBar, SafeAreaView, View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { Colour, Note } from '../../Models/GlobalState';
import * as rnp from 'react-native-paper';
import Header from './Header';
import styles from './styles';
import ColourPicker from './ColourPicker';
import useGlobalContext from '../../Models/GlobalContext';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export type Mode = 'edit' | 'add';

const EditScreen: React.FC<EditScreenProps> = ({ navigation, route }) => {
	const [note, setNote] = useState<Note>(route.params.note);
	const [colourPickerVisible, setColourPickerVisible] = useState<boolean>(false);
	const [mode, setMode] = useState<Mode>(route.params.mode);
	const { state, dispatcher } = useGlobalContext();

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
		setNote({ ...note, colour: colour });
	}

	const onPressSave = () => {
		//Save the note and call navigation.goBack()
		console.log('Pressed save button');
		if (note.title !== "") {
			if (mode === 'edit') {
				const updation_date = new Date();

				updateNote(updation_date)
					.then(() => {
						setNote({...note, updation_date: updation_date.toISOString()});
						dispatcher({ type: 'NOTE_UPDATE', payload: note });
						// navigation.pop();
					})
					.catch(e => {
						Alert.alert(
							'Note Updation Error!',
							e.message,
							[
								{
									text: 'Okay'
								}
							]
						);
						// navigation.pop();
					});

			} else {
				console.log('Creating note');
				const creation_date = new Date();
				createNote(creation_date)
					.then((doc) => {
						console.log('before dispatcher');
						dispatcher(
							{
								type: 'NOTE_ADD',
								payload: { ...note, creation_date: creation_date.toISOString(), id: doc.id }
							});
						navigation.pop();
					})
					.catch((e: any) => {
						console.log('Error');
						Alert.alert(
							'Note Creation Error!',
							e.message,
							[
								{
									text: 'Okay'
								}
							]
						);
						navigation.pop();
					});
			}
		} else {
			console.log('Title empty error');
		}
	};

	const onPressDelete = () => {
		Alert.alert('Delete Note', 'Do you want to delete this note?', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: () => {
					console.log('OK Pressed')
					onPressConfirmDelete();
				}
			},
		]);
	};

	const onPressConfirmDelete = () => {
		console.log('Pressed delete button');
		deleteNote()
			.then(() => {
				dispatcher({ type: 'NOTE_DELETE', payload: note });
				navigation.pop();
			}).catch(e => {
				Alert.alert(
					'Note Updation Error!',
					e.message,
					[
						{
							text: 'Okay'
						}
					]
				);
			});
	};

	const createNote = (creationDate: Date): Promise<FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>> => {
		console.log('inside createNote');
		return firestore()
			.collection('users')
			.doc(auth().currentUser?.email as string)
			.collection('notes')
			// .doc(note.id)
			.add({
				title: note.title,
				text: note.text,
				colour: note.colour,
				creation_date: creationDate,
				updation_date: null,
			});
	};

	const updateNote = (updationDate: Date) => {
		return firestore()
			.collection('users')
			.doc(auth().currentUser?.email as string)
			.collection('notes')
			.doc(note.id)
			.update({
				title: note.title,
				text: note.text,
				colour: note.colour,
				updation_date: updationDate,
			});
	};

	const deleteNote = () => {
		return firestore()
			.collection('users')
			.doc(auth().currentUser?.email as string)
			.collection('notes')
			.doc(note.id)
			.delete();
	};

	let title: string;
	if (mode == 'add') {
		title = 'Create Note'
	} else {
		title = 'Edit Note'
	}

	return (
		<SafeAreaView style={[styles.edit, { backgroundColor: note.colour.hexcode }]}>
			<StatusBar
				animated={true}
				backgroundColor={note.colour.hexcode}
				barStyle='dark-content'
			/>
			<Header
				title={title}
				onBackPress={onBackPressed}
				onPressColourPicker={onPressColourPicker}
				onPressSave={onPressSave}
				onPressDelete={onPressDelete}
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
			</ScrollView>
			{
				mode === 'edit' ?
					<View style={styles.edit__timeView}>
						<Text
							style={styles.edit__timeView__creationText}
						>
							Created on {(new Date(note.creation_date)).toLocaleString()}
						</Text>
						{note.updation_date !== '' ?
							<Text
								style={styles.edit__timeView__updationText}
							>
								Updated on {(new Date(note.updation_date)).toLocaleString()}</Text>
							:
							<></>
						}
					</View>
					:
					<></>
			}
		</SafeAreaView>
	)
}

export default EditScreen