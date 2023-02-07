import styles from '../styles';
import React, {useState} from 'react'
import { StatusBar,SafeAreaView,StyleSheet,Text,View } from 'react-native'
import { Button,TextInput } from 'react-native-paper';
import {LoginScreenProps} from '../../../App';

const LoginScreen: React.FC<LoginScreenProps> = ({navigation,route}) => {
  
	const [email, setEmail] = useState('');
	const [pass, setpass] = useState('');

	const onPressLogin = () => {
		navigation.navigate('Main');
		// console.log(`Registering ${email} - ${pass}`);
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