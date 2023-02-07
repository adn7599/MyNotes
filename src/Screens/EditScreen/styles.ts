import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	edit:{
		width: '100%',
		height: '100%'
	},
	edit__header: {
		height: 60,
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		padding: 3,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	edit__header__backButton: {
		marginLeft: 10
	},
	edit__header__title: {
		fontWeight: 'bold',
		marginLeft: 10,
		flex: 1
	},
	edit__header__title__text: {
		//fontWeight: 'bold',
		fontSize: 23
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
		fontSize: 32
	},
	edit__text:{
		margin: 5,
		marginTop: 0,
		padding: 5
	},
	edit__text__input: {
		fontSize: 25
	},

	//Times
	edit__timeView: {
		borderTopWidth: 0.5,
		padding: 5
	},
	edit__timeView__creationText: {
		fontStyle: 'italic',
		fontSize: 13
	},
	edit__timeView__updationText: {
		fontStyle: 'italic',
		fontSize: 13
	}
});

export default styles;