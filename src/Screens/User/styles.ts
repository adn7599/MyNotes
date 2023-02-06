import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: '#f1d74e',
		padding: 8,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	title: {
		marginTop: '30%',
		width: '95%',
		fontWeight: 'bold',
		fontSize: 38,
		marginBottom: 15,
	},
	inputs: {
		width: '95%',
		marginBottom: 5,
		borderRadius: 5,
	},
	regLoginButton: {
		marginTop: 12,
		width: '95%',
		// fontSize: 15
	}
});

export default styles;