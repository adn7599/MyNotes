import styles from '../styles';
import React, { useState } from 'react'
import { StatusBar, SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { LoginScreenProps } from '../../../App';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {

	const [email, setEmail] = useState('');
	const [pass, setpass] = useState('');

	const onPressLogin = () => {
		// navigation.navigate('Main');
		// console.log(`Registering ${email} - ${pass}`);
		if (email === '') {
			Alert.alert('Email field empty', 'Please enter your email address', [{ text: 'Okay' }]);
			return;
		}
		if (pass === '') {
			Alert.alert('Password field empty', 'Please enter your password', [{ text: 'Okay' }]);
			return;
		}
		userLogin();
	}

	const userLogin = () => {
		auth()
			.signInWithEmailAndPassword(email, pass)
			.then((userCred) => {
				console.log(userCred);
				console.log(auth().currentUser);

				navigation.replace('Main');
			})
			.catch(e => {
				console.log(`Error while signing in ${e.code} / ${e.message} `);

				if (e.code === 'auth/wrong-password') {
					Alert.alert('Wrong password', 'Please enter the correct password', [{ text: 'Okay' }]);
				}
				else if(e.code === 'auth/invalid-email'){
					Alert.alert('Invalid Email', 'Please enter the correct email', [{ text: 'Okay' }]);
				}
				else if(e.code === 'auth/user-not-found'){
					Alert.alert('User not registered', 'Please enter registered email address', [{ text: 'Okay' }]);
				}
				else {
					Alert.alert('Login error', e.message, [{ text: 'Okay' }]);
				}
			})
	}

	return (
		<SafeAreaView>
			<StatusBar
				animated={true}
				backgroundColor="#f1d74e"
				barStyle='dark-content'
			/>
			<View style={styles.container}>
				<Text style={styles.title}>
					Login
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
					value={pass}
					onChangeText={(t) => { setpass(t) }}
				/>

				<Button mode='contained' style={styles.regLoginButton} onPress={() => { onPressLogin() }}>
					Login
				</Button>
			</View>
		</SafeAreaView>
	);

}


export default LoginScreen