import React, { useState } from 'react';
import { TouchableWithoutFeedback,TextInput, View, TouchableNativeFeedback } from 'react-native';
import { Avatar, Searchbar, TouchableRipple } from 'react-native-paper';
import useGlobalContext from '../../Models/GlobalContext';
import styles from './Styles';

interface Props {
	avatarLetter: string,
	setAccountModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({ avatarLetter, setAccountModalVisible }) => {

	const [search, setSearch] = useState("");

	const global = useGlobalContext();
	const searchNote = () => {
		console.log("Pressed search submit - " + search);
		if (search !== "") {
			console.log('Not empty');
			global.dispatcher({ type: "NOTE_SEARCH", payload: search });
		} else {
			global.dispatcher({ type: "NOTE_SEARCH_RESET", payload: null });
		}
	};

	return (<View style={styles.main__header}>
		{/* <TextInput
			style={styles.main__header__search}
			defaultValue={search}
			onChangeText={t => { setSearch(t) }}
			onSubmitEditing={() => { searchNote() }}
			onBlur={() => searchNote()}
			placeholder='Search your notes'
			clearButtonMode='while-editing'
		/> */}
		<Searchbar
			placeholder='Search your notes'
			onChangeText={t => { setSearch(t) }}
			onSubmitEditing={() => { searchNote() }}
			onEndEditing={() => { searchNote() }}
			onBlur={() => searchNote()}
			clearButtonMode='never'
			value={search}
			style={styles.main__header__search}
		/>
		<TouchableWithoutFeedback onPress={() => { setAccountModalVisible(true) }}>
			<Avatar.Text
				size={40}
				label={avatarLetter}
				style={styles.main__header__avatar}
			/>
		</TouchableWithoutFeedback>
	</View>)
};
export default Header;