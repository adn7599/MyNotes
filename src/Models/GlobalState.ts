import uuid from 'react-native-uuid';

export type Colour = { label: string; hexcode: string };
export const Colours: Colour[] =
	[
		{ label: "pink", hexcode: "#f38989" },
		{ label: "green", hexcode: "#51c37f" },
		{ label: "purple", hexcode: "#c351bf" },
		{ label: "blue", hexcode: "#5186c3" },
		{ label: "yellow", hexcode: "#f1d74e" },
		{ label: "white", hexcode: "#f2ead8" },
	]

export interface Note {
	id: string;
	title: string;
	text: string,
	colour: Colour;
	creation_date: string;
	updation_date: string | null;
	isVisible: boolean; //For search visibility
}
export function createNote(title: string, text: string, colour: Colour): Note {
	let uu = uuid.v4().toString();
	return {
		id: uu,
		title,
		text,
		colour,
		creation_date: (new Date()).toISOString(),
		updation_date: null,
		isVisible: true
	};
}

export interface UserLogin {
	isLoggedIn: boolean,
	username: string;
	token: string;
};

export default interface GlobalState {
	notes: Note[];
	userLogin: UserLogin;
}

const testArray: Note[] = [1, 2, 3, 4, 5,6,7,8,9,10,11,12].map((i) => {
	return createNote(`Note title ${i}`, 'lorem ipsum ipsum ipasdfajkjlsj ksdf', Colours[i%Colours.length]);
});

export const initState: GlobalState = {
	notes: [...testArray],
	userLogin: {
		isLoggedIn: false,
		username: "",
		token: "",
	}
};
