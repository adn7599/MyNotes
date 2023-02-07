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
		<View
			style={myStyles.fab__touchable}
		>
			<TouchableNativeFeedback
				onPress={() => { onClickHandler() }}
			>
				<View
					style={myStyles.fab__touchable__view}
				>
					<IconMaterial
						name='add'
						style={{ color: '#331a1a' }}
						size={40}
					/>
				</View>
			</TouchableNativeFeedback>
		</View>
	)
}

const myStyles = StyleSheet.create({
	fab__touchable: {
		width: CIRCLE_DIAMETER,
		height: CIRCLE_DIAMETER,
		borderRadius: CIRCLE_DIAMETER / 2,
		zIndex: 10,
		margin: 5,
		position: 'absolute',
		right: 10,
		bottom: 10,
		overflow: 'hidden'
	},
	fab__touchable__view: {
		width: CIRCLE_DIAMETER,
		height: CIRCLE_DIAMETER,
		borderRadius: CIRCLE_DIAMETER / 2,
		backgroundColor: '#f1d74e',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default FloatingActionButtion