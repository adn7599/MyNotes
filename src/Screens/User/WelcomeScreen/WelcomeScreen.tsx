import React from 'react'
import { StatusBar, SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { WelcomeScreenProps } from '../../../App';
import styles from '../styles';

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation, route }) => {

	const onPressRegister = () => {
		navigation.navigate('Register');
	};
	const onPressLogin = () => {
		navigation.navigate('Login');
	};

	return (
		<SafeAreaView>
			<StatusBar
				animated={true}
				backgroundColor="#f1d74e"
				barStyle='dark-content'
			/>
			<View style={[styles.container, myStyles.container]}>
				<Text style={[styles.title, myStyles.title]}>
					Welcome!
				</Text>
				<Button mode='contained' style={styles.regLoginButton} onPress={() => { onPressRegister() }}>
					Register
				</Button>
				<Button mode='contained' style={styles.regLoginButton} onPress={() => { onPressLogin() }}>
					Login
				</Button>
			</View>
		</SafeAreaView>
	)
}

const myStyles = StyleSheet.create({
	container: {
	},
	title: {
		marginTop: '48%',
	}
});

export default WelcomeScreen;