import styles from '../styles';
import React, { useState } from 'react'
import { StatusBar, SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { RegisterScreenProps } from '../../../App';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation, route }) => {

	const [email, setEmail] = useState('');
	const [pass1, setPass1] = useState('');
	const [pass2, setPass2] = useState('');

	const onPressRegister = () => {
		console.log(`Registering ${email} - ${pass1}, ${pass2}`);

		if (email == "") {
			Alert.alert('Email field empty!', 'Please enter your email', [{ text: 'Okay' }])
			return;
		}

		if (pass1 === pass2) {
			registerUser();
		} else {
			Alert.alert(
				"Passwords don't match"
				, 'Please enter matching passwords',
				[{ text: 'Okay', onPress: () => { } }]);
		}
	}

	const registerUser = () => {
		auth()
			.createUserWithEmailAndPassword(email, pass1)
			.then(() => {
				console.log('User account created & signed in!');
				Alert.alert(
					'User registered successfully',
					'Proceed for login',
					[
						{
							text: 'Login',
							onPress: () => {
								navigation.replace('Login');
							}
						}
					]);
			})
			.catch(error => {
				if (error.code === 'auth/email-already-in-use') {
					// console.log('That email address is already in use!');
					Alert.alert('Email address already in use', 'Please use another email', [{ text: 'Okay' }])
				}
				else if (error.code === 'auth/invalid-email') {
					// console.log('That email address is invalid!');
					Alert.alert('Invalid Email address', 'Please enter correct email adddress', [{ text: 'Okay' }])
				} else {
					Alert.alert('Registration Error', `${error.message}`, [{ text: 'Okay' }])
				}
				console.error(error);
			});
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
					Register
				</Text>
				<TextInput
					style={styles.inputs}
					label='email' value={email}
					onChangeText={(t) => { setEmail(t) }}
				/>
				<TextInput
					style={styles.inputs}
					label='password'
					secureTextEntry={true}
					value={pass1}
					onChangeText={(t) => { setPass1(t) }}
				/>
				<TextInput
					style={styles.inputs}
					label='re-enter password'
					secureTextEntry={true}
					value={pass2}
					onChangeText={(t) => { setPass2(t) }}
				/>

				<Button mode='contained' style={styles.regLoginButton} onPress={() => { onPressRegister() }}>
					Register
				</Button>
			</View>
		</SafeAreaView>
	);
}

export default RegisterScreen