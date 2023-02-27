import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView, FlatList, StatusBar, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import useGlobalContext from '../../Models/GlobalContext';
import Header from './Header';
import NoteCard from './Note';
import styles from './Styles';
import navigation, { useNavigation } from '@react-navigation/native';
import GlobalState, { Colour, Colours, createNote, Note } from '../../Models/GlobalState';
import { MainScreenProps } from '../../App';
import FloatingActionButtion from './FloatingActionButtion';
import AccountModal from './AccountModal';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const MainScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
	const [accountModalVisible, setAccountModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const global = useGlobalContext();

	const avatarLetter = global.state.userLogin.email.charAt(0).toUpperCase();

	useEffect(() => {
		const user = auth().currentUser;
		console.log('Current user: ' + user?.email);
		// console.log('Current user: ' + user?.getIdToken());
		const newGlobalState: GlobalState = {
			notes: [],
			userLogin: {
				email: user?.email as string,
			}
		};
		firestore()
			.collection('users')
			.doc(newGlobalState.userLogin.email)
			.collection('notes')
			.get()
			.then(notes => {
				notes.docs.forEach((note) => {
					const n = note.data();
					// console.log(note.id);	
					newGlobalState.notes.push({
						title: n.title,
						text: n.text,
						colour: n.colour,
						id: note.id,
						creation_date: n.creation_date.toDate().toISOString(),
						updation_date: n.updation_date ? n.updation_date.toDate().toISOString() : '',
						isVisible: true,
					});
				});
				global.dispatcher({ type: 'INIT', payload: newGlobalState });
				setIsLoading(false);
			})
			.catch(e => {
				console.log(e);
			});
	}, []);

	const onPressLogoutModal = () => {
		setAccountModalVisible(false);

		auth().signOut()
			.then(() => {
				Alert.alert(
					'User logger out successfully',
					'Thank you!',
					[{
						text: 'Okay',
					}]
				);
				if (navigation.canGoBack()) {
					navigation.popToTop();
				} else {
					navigation.replace('Welcome');
				}
			})
			.catch((e) => {
				Alert.alert('Logout error', e.message, [{ text: 'Okay' }]);
				if (navigation.canGoBack()) {
					navigation.popToTop();
				} else {
					navigation.replace('Welcome');
				}
			});
	}

	const onPressDeleteAcc = () => {
		deleteAccount()
			.then(() => {
				Alert.alert(
					'Account Deleted successfully',
					'Please register again to continue',
					[
						{
							text: 'Okay',
							onPress: () => {
								if (navigation.canGoBack()) {
									navigation.popToTop();
								} else {
									navigation.replace('Welcome');
								}
							}
						}
					]
				)
			}).catch((e) => {
				Alert.alert(
					'Account Deletion error',
					e.message,
					[
						{
							text: 'Okay',
							onPress: () => {
								if (navigation.canGoBack()) {
									navigation.popToTop();
								} else {
									navigation.replace('Welcome');
								}
							}
						}
					]
				)
			});
	};

	const deleteAccount = async () => {
		const db = firestore();
		const snap = await db.collection('users')
			.doc(global.state.userLogin.email)
			.collection('notes')
			.get()
		const batch = db.batch()
		snap.forEach((doc) => {
			// console.log(doc.ref);
			batch.delete(doc.ref);
		});
		await batch.commit()
		await auth().currentUser?.delete();
	};

	const onPressChangePassModal = () => {
		setAccountModalVisible(false);
		navigation.push('ChangePass');
	}

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
				{i + 1 < notes.length ? <NoteCard note={notes[i + 1]} onClick={handlerOnClick} />
					:
					<View style={styles.main__body__noteCard}></View>}
			</View>
		);
	}

	if (isLoading) {
		return (<SafeAreaView style={[styles.main, { alignItems: 'center', justifyContent: 'center' }]}>
			<StatusBar
				animated={true}
				backgroundColor="#f1d74e"
				barStyle='dark-content'
			/>
			<ActivityIndicator animating={true} size={'large'} />
		</SafeAreaView>)
	}

	return (
		<SafeAreaView style={styles.main}>
			<StatusBar
				animated={true}
				backgroundColor="#f1d74e"
				barStyle='dark-content'
			/>
			<Header
				avatarLetter={avatarLetter}
				setAccountModalVisible={setAccountModalVisible}
			/>
			<AccountModal
				email={global.state.userLogin.email}
				isVisible={accountModalVisible}
				setIsVisible={setAccountModalVisible}
				onPressLogout={onPressLogoutModal}
				onPressChangePass={onPressChangePassModal}
				onPressDeleteAcc={onPressDeleteAcc}
			/>
			<FloatingActionButtion
				onClickHandler={handlerAddNote}
			/>
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