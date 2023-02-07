import React, { useState } from 'react';
import styles from '../styles';
import { StatusBar, StyleSheet, Alert, SafeAreaView, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { ChangePassScreenProps } from '../../../App';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const ChangePassScreen: React.FC<ChangePassScreenProps> = ({ navigation, route }) => {
	const [oldPass, setOldPass] = useState('');
	const [pass1, setPass1] = useState('');
	const [pass2, setPass2] = useState('');

	const onPressConfirm = () => {
		// navigation.popToTop();
		if (oldPass === '' || pass1 === '' || pass2 === '') {
			Alert.alert('Field empty', 'Please enter all the required fields', [{ text: 'Okay' }]);
			return;
		}
		if (pass1 !== pass2) {
			Alert.alert(
				"Passwords don't match"
				, 'Please enter matching passwords',
				[{ text: 'Okay', onPress: () => { } }]);
			return;
		}
		changePassword();
	};

	const changePassword = async () => {
		try {
			let user = auth().currentUser;
			await user?.reauthenticateWithCredential(auth.EmailAuthProvider.credential(user.email as string, oldPass));
			//After reauthentication	
			user = auth().currentUser;
			user?.updatePassword(pass1);
			
			Alert.alert(
				'Password updated successfully',
				'Please login again to continue',
				[
					{
						text : 'Okay',
						onPress:  () => {
							navigation.popToTop();
						}
					}
				]
			)

		} catch (e: any) {
			console.log(`${e.code} / ${e.message}`);
			if (e.code === 'auth/wrong-password') {
				Alert.alert(
					"Incorrect Old Password"
					, 'Please enter the correct old password',
					[{ text: 'Okay', onPress: () => { } }]);
			} else {
				Alert.alert('Error', `${e.code} ${e.message}`, [{ text: 'Okay' }])
			}
		}
	};

	const onPressCancel = () => {
		navigation.goBack();
	};

	return (
		<SafeAreaView>
			<StatusBar
				animated={true}
				backgroundColor="#f1d74e"
				barStyle='dark-content'
			/>
			<View style={styles.container}>
				<Text style={styles.title}>
					Change {"\n"}Password
				</Text>
				<TextInput
					style={styles.inputs}
					label='Old Password'
					secureTextEntry={true}
					value={oldPass}
					onChangeText={(t) => { setOldPass(t) }}
				/>
				<TextInput
					style={styles.inputs}
					label='New Password'
					secureTextEntry={true}
					value={pass1}
					onChangeText={(t) => { setPass1(t) }}
				/>
				<TextInput
					style={styles.inputs}
					label='Re-enter New Password'
					secureTextEntry={true}
					value={pass2}
					onChangeText={(t) => { setPass2(t) }}
				/>

				<Button
					mode='contained'
					style={styles.regLoginButton}
					onPress={() => { onPressConfirm() }}
				>
					Confirm
				</Button>
				<Button
					mode='contained'
					style={styles.regLoginButton}
					onPress={() => { onPressCancel() }}
				>
					Cancel
				</Button>
			</View>
		</SafeAreaView>
	)
}

export default ChangePassScreen