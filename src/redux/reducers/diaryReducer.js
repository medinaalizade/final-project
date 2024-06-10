import { SAVE_DIARY_ENTRY, LOAD_DIARY_ENTRIES } from '../actions/diaryActions';

const initialState = {
  diaryEntries: [],
};

const diaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DIARY_ENTRY:
      const { email, date, text } = action.payload;
      const entryIndex = state.diaryEntries.findIndex(entry => entry.date === date && entry.email === email);
      if (entryIndex > -1) {
        const updatedEntries = [...state.diaryEntries];
        updatedEntries[entryIndex] = { email, date, text };
        return { ...state, diaryEntries: updatedEntries };
      }
      return { ...state, diaryEntries: [...state.diaryEntries, { email, date, text }] };
    
    case LOAD_DIARY_ENTRIES:
      const emailToLoad = action.payload;
      return {
        ...state,
        diaryEntries: state.diaryEntries.filter(entry => entry.email === emailToLoad),
      };
      
    default:
      return state;
  }
};

export default diaryReducer;