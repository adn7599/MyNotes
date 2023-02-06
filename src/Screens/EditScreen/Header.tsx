import React, { useState } from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import styles from './styles';


interface Props {
	title: string;
	onBackPress: () => void;
	onPressColourPicker: () => void;
	onPressSave: () => void;
	onPressDelete: () => void;
}

const Header: React.FC<Props> = ({ title, onBackPress,onPressColourPicker,onPressSave,onPressDelete }) => {

	return (
		<View style={styles.edit__header}>
			<TouchableNativeFeedback
				onPress={() => { onBackPress() }}
			>
				<View
					style={styles.edit__header__backButton}
				>
					<IconAntDesign
						name='arrowleft'
						style={{color: 'black'}}
						size={35}
					/>
				</View>
			</TouchableNativeFeedback>

			<View style={styles.edit__header__title}>
				<Text style={styles.edit__header__title__text}>
					{title}
				</Text>
			</View>
		
			<TouchableNativeFeedback
				onPress={() => { onPressDelete() }}
			>
				<View
					style={styles.edit__header__colorPickerButton}
				>
					<IconMaterial
						name='delete'
						size={35}
					/>
				</View>
			</TouchableNativeFeedback>
			<TouchableNativeFeedback
				onPress={() => { onPressColourPicker() }}
			>
				<View
					style={styles.edit__header__colorPickerButton}
				>
					<IconMaterial
						name='color-lens'
						size={35}
					/>
				</View>
			</TouchableNativeFeedback>
			
			<TouchableNativeFeedback
				onPress={() => { onPressSave() }}
			>
				<View
					style={styles.edit__header__saveButton}
				>
					<IconMaterial
						name='save'
						size={35}
					/>
				</View>
			</TouchableNativeFeedback>
			
		</View>
	);
}

export default Header