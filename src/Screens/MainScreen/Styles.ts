import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	main: {
		height: '100%',
		width: '100%',
	},
	//header
	main__header: {
		width: '100%',
		height: 65,
		padding: 3,
		backgroundColor: '#f1d74e',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	main__header__search: {
		backgroundColor: '#d9d9d9',
		borderRadius: 10,
		margin: 1,
		padding: 8,
		width: 'auto',
		flex: 5,
	},
	main__header__avatar : {
		marginHorizontal: 5,
	},
	//Body
	main__body: {
		padding: 5,
		// backgroundColor: 'pink',
		backgroundColor: 'white',
		width: '100%',
		height: '100%',
		flexDirection: 'column',
	},
	main__body__noteDiv:{
		flexDirection:'row',
	},
	main__body__TouchableNote:{
		borderRadius: 8,
		width: '100%',
		justifyContent: 'space-evenly',
	},
	main__body__noteCard: {
		// backgroundColor: 'yellow',
		flex: 1,
		// width: '50%',	
		height: 200,
		padding: 8,
		margin: 4,
		borderRadius: 8,
		
		// borderColor: 'blue',
		// borderWidth: 3,
	},
	main__body__noteCardSelected: {
		borderColor: 'blue',
		borderWidth: 3,
	},
	main__body__noteCard__title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	main__body__noteCard__text: {
		fontSize: 14,
	}
});

export default styles;
