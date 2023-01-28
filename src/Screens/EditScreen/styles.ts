import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	edit:{
		width: '100%',
		height: '100%'
	},
	edit__header: {
		height: 65,
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		padding: 5,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	edit__header__backButton: {
		marginLeft: 10
	},
	edit__header__title: {
		marginLeft: 10,
		flex: 1
	},
	edit__header__title__text: {
		fontSize: 25
	},
	edit__header__saveButton: {
		margin: 10
	},
	edit__header__colorPickerButton: {
		margin: 10
	},

	//Body	
	edit__title:{
		margin: 5,
		padding: 5
	},
	edit__title__input: {
		fontWeight: 'bold',
		fontSize: 35
	},
	edit__text:{
		margin: 5,
		padding: 5
	},
	edit__text__input: {
		fontSize: 25
	},
});

export default styles;