import React from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

interface Props {
	onClickHandler: () => void
}

const CIRCLE_DIAMETER = 60;

const FloatingActionButtion: React.FC<Props> = ({ onClickHandler }) => {
	return (
		<TouchableRipple
			style={myStyles.fab__touchable}
			onPress={() => { onClickHandler() }}
		>
			<View
				style={myStyles.fab__touchable__view}
			>
				<IconMaterial
					name='add'
					style={{ color: 'black' }}
					size={40}
				/>
			</View>
		</TouchableRipple>
	)
}

const myStyles = StyleSheet.create({
	fab__touchable: {
		width: CIRCLE_DIAMETER,
		height: CIRCLE_DIAMETER,
		borderRadius: CIRCLE_DIAMETER/2,
		zIndex: 10,
		margin: 5,
		position: 'absolute',
		right: 10,
		bottom: 10,
	},
	fab__touchable__view: {
		width: CIRCLE_DIAMETER,
		height: CIRCLE_DIAMETER,
		borderRadius: CIRCLE_DIAMETER/2,
		backgroundColor: '#f1d74e',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default FloatingActionButtion