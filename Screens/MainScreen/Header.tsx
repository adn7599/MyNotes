import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import {Avatar} from 'react-native-paper';
import useGlobalContext from '../../Models/GlobalContext';
import styles from './Styles';
const Header : React.FC = () => {

	const [search, setSearch] = useState("");
	const global = useGlobalContext();
	const searchNote = () => {
		console.log("Pressed search submit - "+search);
		if(search !== ""){
			console.log('Not empty');
			global.dispatcher({type: "NOTE_SEARCH", payload: search});
		}else {
			global.dispatcher({type: "NOTE_SEARCH_RESET", payload: null});
		}
	};

	return (<View style={styles.main__header}>
		<TextInput style={styles.main__header__search} defaultValue={search} onChangeText={t => setSearch(t)} onSubmitEditing={()=> searchNote()} placeholder='Search your notes' />
		<Avatar.Text size={40} label='A' style={styles.main__header__avatar}/>
	</View>)
};
export default Header;