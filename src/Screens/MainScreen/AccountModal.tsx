import React from 'react'
import { Modal, View, TouchableNativeFeedback, StyleSheet, Text, Alert } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { WelcomeScreenProps } from '../../App';

interface Props {
	email: string,
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	onPressLogout: () => void;
	onPressChangePass: () => void;
	onPressDeleteAcc: () => void;
};

const AccountModal: React.FC<Props> = ({ email, isVisible, setIsVisible, onPressLogout, onPressChangePass, onPressDeleteAcc }) => {

	const avatarLetter = email.charAt(0).toUpperCase();

	return (
		<Modal
			animationType="fade"
			style={myStyles.modal}
			transparent={true}
			visible={isVisible}
			onRequestClose={() => { setIsVisible(false) }}
		>
			<View
				style={myStyles.modalView}
			>
				<View style={myStyles.header}>
					<View style={{ flex: 1 }}></View>
					<TouchableNativeFeedback
						onPress={() => { setIsVisible(false) }}
					>
						<View
							style={myStyles.header__close}
						>
							<IconMaterial
								name='close'
								style={{ color: 'black' }}
								size={35}
							/>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={myStyles.body}>
					<View
						style={myStyles.avatar}
					>
						<Avatar.Text
							size={100}
							label={avatarLetter}
						/>
					</View>
					<Text style={myStyles.email}>
						{email}
					</Text>
					<View style={myStyles.button}>
						<TouchableNativeFeedback onPress={() => { onPressChangePass() }}>
							<View style={myStyles.button__view}>
								<Text style={myStyles.button__view__text}>
									Change Password
								</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
					<View style={myStyles.button}>
						<TouchableNativeFeedback onPress={() => {
							Alert.alert('Delete Account', 'Do you want to delete this Account?', [
								{
									text: 'Cancel',
									onPress: () => console.log('Cancel Pressed'),
									style: 'cancel',
								},
								{
									text: 'OK',
									onPress: () => {
										console.log('OK Pressed')
										onPressDeleteAcc()
									}
								},
							]);
						}}>
							<View style={myStyles.button__view}>
								<Text style={myStyles.button__view__text}>
									Delete Account
								</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
					<View style={myStyles.button}>
						<TouchableNativeFeedback onPress={() => { onPressLogout() }}>
							<View style={myStyles.button__view}>
								<Text style={myStyles.button__view__text}>
									Logout
								</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const myStyles = StyleSheet.create({
	modal: {
	},
	modalView: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 15,
		alignItems: 'center',
		width: '85%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		position: 'absolute',
		top: '25%',
		alignSelf: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	header__close: {
		padding: 3
	},
	body: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	avatar: {
		marginBottom: 18,
	},
	email: {
		fontWeight: 'bold',
		fontSize: 18,
		textAlign: 'center',
		width: '90%',
		marginBottom: 15,
		paddingBottom: 12,
		borderBottomColor: 'grey',
		borderBottomWidth: 1,
	},
	button: {
		borderRadius: 5,
		width: '100%',
		alignItems: 'center',
	},
	button__view: {
		padding: 5,
		width: '70%',
		// borderTopWidth: 1,
		// borderTopColor: 'black',
		// borderBottomWidth: 1,
		// borderBottomColor: 'black'
	},
	button__view__text: {
		textAlign: 'center',
		fontWeight: 'bold',
		padding: 3,
		fontSize: 16,
	}
});

export default AccountModal;