export const SAVE_DIARY_ENTRY = 'SAVE_DIARY_ENTRY';
export const LOAD_DIARY_ENTRIES = 'LOAD_DIARY_ENTRIES';

export const saveDiaryEntry = (email, date, text) => ({
  type: SAVE_DIARY_ENTRY,
  payload: { email, date, text },
});

export const loadDiaryEntries = (email) => ({
  type: LOAD_DIARY_ENTRIES,
  payload: email,
});