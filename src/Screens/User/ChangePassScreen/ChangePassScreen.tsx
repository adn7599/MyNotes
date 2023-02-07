import React, { useState } from 'react';
import styles from '../styles';
import { StatusBar,StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { ChangePassScreenProps } from '../../../App';

const ChangePassScreen: React.FC<ChangePassScreenProps> = ({ navigation, route }) => {
	const [oldPass, setOldPass] = useState('');
	const [pass1, setPass1] = useState('');
	const [pass2, setPass2] = useState('');

	const onPressConfirm = () => {
		navigation.popToTop();
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