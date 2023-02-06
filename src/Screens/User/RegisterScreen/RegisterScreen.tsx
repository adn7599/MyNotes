import styles from '../styles';
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { RegisterScreenProps } from '../../../App';

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation,route}) => {

	const [email, setEmail] = useState('');
	const [pass1, setPass1] = useState('');
	const [pass2, setPass2] = useState('');

	const onPressRegister = () => {
		console.log(`Registering ${email} - ${pass1}, ${pass2}`);
	}

	return (
		<SafeAreaView>
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