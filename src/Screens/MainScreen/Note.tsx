import React from 'react'
import { Text, Touchable, TouchableNativeFeedback, View } from 'react-native';
import { Note } from '../../Models/GlobalState'
import styles from './Styles';

interface Props {
	note: Note,
	onClick: (note: Note) => void
}

const NoteCard: React.FC<Props> = ({ note,onClick }) => {
	return (
		<TouchableNativeFeedback 
			style={styles.main__body__TouchableNote} 
			onPress={()=> {onClick(note)}}
		>
			<View style={[
				styles.main__body__noteCard,
				{ backgroundColor: note.colour.hexcode }]}
			>
			<Text style={styles.main__body__noteCard__title}>{note.title}</Text>
			<Text style={styles.main__body__noteCard__text}>{note.text}</Text>
			<Text>{note.isVisible ? 'Yes' : 'No'}</Text>
		</View>
			{/* <Text>{note.colour.hexcode}</Text> */ }
		</TouchableNativeFeedback >
	);
}

export default NoteCard;
