import { fromJS } from 'immutable';

export const CHANGE_LOCALE = 'app/LanguageToggle/CHANGE_LOCALE';
export const DEFAULT_LOCALE = 'en';

export const initialState = fromJS({
  locale: DEFAULT_LOCALE
});

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale
  };
}

export default function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state
        .set('locale', action.locale);
    default:
      return state;
  }
}
