import React from 'react'
import { Modal, View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Colour, Colours } from '../../Models/GlobalState';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const CIRCLE_DIAMETER = 50;

interface Props {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	pickedColour: Colour;
	onColourSelected: (colour: Colour) => void
}

const ColourPicker: React.FC<Props> = ({ modalVisible, setModalVisible, pickedColour, onColourSelected }) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible)
			}

			}
		>
			<View
				style={myStyles.modalView}
			>
				<View style={myStyles.header}>
					<View style={{ flex: 1 }}></View>
					<TouchableNativeFeedback
						onPress={() => { setModalVisible(false) }}
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
					{Colours.map(c => <ColourButton key={c.hexcode} colour={c} isSelected={c.hexcode == pickedColour.hexcode} onSelected={onColourSelected} />)}
				</View>
			</View>
		</Modal>
	)
}
type ColourButtonProps = {
	colour: Colour;
	isSelected: boolean;
	onSelected: (colour: Colour) => void;
}

const ColourButton: React.FC<ColourButtonProps> = ({ colour, isSelected, onSelected }) => {
	let stl = { backgroundColor: colour.hexcode }
	if (isSelected) {
		stl = { ...stl, ...myStyles.selectedCirle };
		return (
			<TouchableNativeFeedback style={myStyles.circle} onPress={() => onSelected(colour)}>
				<View
					style={[myStyles.circle, stl]}
				>
					<IconMaterial
						name='check'
						style={{ color: 'black' }}
						size={35}
					/>
				</View>
			</TouchableNativeFeedback>)
	} else {
		return (
			<TouchableNativeFeedback style={myStyles.circle} onPress={() => onSelected(colour)}>
				<View
					style={[myStyles.circle, stl]}
				>
				</View>
			</TouchableNativeFeedback>)
	}
}

const myStyles = StyleSheet.create({
	modal: {

	},
	modalView: {
		//margin: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 15,
		alignItems: 'center',
		width: 280,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		position: 'absolute',
		top: '35%',
		alignSelf: 'center',
	},

	header: {
		flexDirection: 'row',
		height: 44,
		marginBottom: 15,
	},
	header__close: {

	},
	body: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: 'center',
		width: 180
	},
	circle: {
		margin: 5,
		width: CIRCLE_DIAMETER,
		height: CIRCLE_DIAMETER,
		borderRadius: CIRCLE_DIAMETER / 2,
		borderColor: 'grey',
		borderWidth: 1
	},
	selectedCirle: {
		borderColor: 'black',
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});

export default ColourPicker 