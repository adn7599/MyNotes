import React from 'react'
import { Text, Touchable, View } from 'react-native';
import { Note } from '../../Models/GlobalState'
import styles from './Styles';

interface Props {
	note: Note
}

const NoteCard: React.FC<Props> = ({ note }) => {
	return (
		<View style={{...styles.main__body__noteCard,backgroundColor: note.colour.hexcode}} key={note.id}>
			<Text style= {styles.main__body__noteCard__title}>{note.title}</Text>
			<Text style={styles.main__body__noteCard__text}>{note.text}</Text>
			<Text>{note.isVisible? 'Yes': 'No'}</Text>
			{/* <Text>{note.colour.hexcode}</Text> */}
		</View>
	);
}

export default NoteCard;
