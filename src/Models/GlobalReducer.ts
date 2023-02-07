import GlobalState, { Note } from "./GlobalState"

export type Action =
	//Notes
	{type: 'INIT', payload: GlobalState} |
	{ type: 'NOTE_ADD', payload: Note } |
	{ type: 'NOTE_DELETE', payload: Note } |
	{ type: 'NOTE_UPDATE', payload: Note }|
	{ type: 'NOTE_SEARCH', payload: string } |
	{ type: 'NOTE_SEARCH_RESET', payload: null };
//User Login
//To be added

export const GlobalReducer = (state: GlobalState, action: Action): GlobalState => {
	let newState: GlobalState = {...state};

	switch (action.type) {
		case 'INIT':
			newState = action.payload;
			break;
		case 'NOTE_ADD':
			newState.notes.push(action.payload);
			break;
		case 'NOTE_DELETE':
			newState.notes = newState.notes.filter((n) => {
				return n.id !== action.payload.id;
			});
			break;
		case 'NOTE_UPDATE':
			console.log('Updated note' + action.payload.text);
			newState.notes = newState.notes.map((n) => {
				if (n.id === action.payload.id) {
					return action.payload;
				}
				return n;
			});
			break;
		case 'NOTE_SEARCH':
			newState.notes = newState.notes.map(n => {
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
			newState.notes = newState.notes.map(n => {
				n.isVisible = true;
				return n;
			})
			break;
		default:
			console.log('Invalid action type submitted!');	
			break;
	}

	return newState;
}

