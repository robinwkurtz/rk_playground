import frenchMessages from '../../language/fr';

/*
This module takes care of the i18n logic.
Since we only have two languages, we avoided using a dynamic array
en is default, fr has translated messages

We export an action called switchLanguage which is used by onEnter in the router
*/

// TYPES

const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

export const DEFAULT_LANGUAGE = 'en';
const DEFAULT_EN_PATH = '/';
const DEFAULT_FR_PATH = '/';

// REDUCERS

const INITIAL_STATE = {
    language: DEFAULT_LANGUAGE,
    messages: {},
    frLink: DEFAULT_FR_PATH,
    enLink: DEFAULT_EN_PATH
};

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SWITCH_LANGUAGE:
        const messages = action.language === 'en' ? {} : frenchMessages;
        return {
            ...state,
            language: action.language,
            messages: messages
        };

        // case LOAD_COURSE_SUCCESS:
        // const course = action.result;
        // let enLink, frLink;
        // if (course) {
        //     enLink = '/courses/' + url.parse(course.link_en).path.replace('/course/', '');
        //     frLink = '/fr/cours/' + url.parse(course.link_fr).path.replace('/fr/course/', '');
        // }
        // else {
        //     enLink = DEFAULT_EN_PATH;
        //     frLink = DEFAULT_FR_PATH;
        // }

        return {
            ...state,
            enLink,
            frLink
        };
    }

    return state;
};

export const switchLanguage = (language) => {
    return {
        type: SWITCH_LANGUAGE,
        language
    };
};
