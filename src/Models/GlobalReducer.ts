import GlobalState, { Note } from "./GlobalState"

export type Action =
	//Notes
	{ type: 'NOTE_ADD', payload: Note } |
	{ type: 'NOTE_DELETE', payload: Note } |
	{ type: 'NOTE_UPDATE', payload: Note }|
	{ type: 'NOTE_SEARCH', payload: string } |
	{ type: 'NOTE_SEARCH_RESET', payload: null };
//User Login
//To be added

export const GlobalReducer = (state: GlobalState, action: Action) => {
	switch (action.type) {
		case 'NOTE_ADD':
			state.notes.push(action.payload);
			break;
		case 'NOTE_DELETE':
			state.notes = state.notes.filter((n) => {
				n.id !== action.payload.id;
			});
			break;
		case 'NOTE_UPDATE':
			console.log('Updated note' + action.payload.text);
			state.notes = state.notes.map((n) => {
				if (n.id === action.payload.id) {
					return action.payload;
				}
				return n;
			});
			break;
		case 'NOTE_SEARCH':
			state.notes = state.notes.map(n => {
				const lower_search = action.payload.toLowerCase();
				if(n.title.toLowerCase().includes(lower_search) || n.text.toLowerCase().includes(lower_search)){
					n.isVisible = true;
					console.log('Is Visible - ' + n.title);
				}else{
					n.isVisible = false;
					console.log('Is Not Visible - ' + n.title);
				}
				return n;
			});
			break;
		case 'NOTE_SEARCH_RESET':
			console.log('Search Reset!');
			state.notes = state.notes.map(n => {
				n.isVisible = true;
				return n;
			})
			break;
		default:
			break;
	}

	return state;
}

