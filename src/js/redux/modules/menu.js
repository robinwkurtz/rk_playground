import * as api from '../../api-client';

// TYPES

const LOAD_MENU = 'LOAD_MENU';
const LOAD_MENU_SUCCESS = 'LOAD_MENU_SUCCESS';
const LOAD_MENU_FAIL = 'LOAD_MENU_FAIL';
const TOGGLE_MENU = 'TOGGLE_MENU';

// ACTIONS

const _isLoaded = (state) => {
    return state.menu && state.menu.loaded;
};

export const load = ($id) => {
	return (dispatch, getState) => {
		if (_isLoaded(getState())) {
            return;
        }

		dispatch({ type: LOAD_MENU });
        return api.fetchMenu($id)
        .then(
            result => dispatch({ type: LOAD_MENU_SUCCESS, result })
        )
        .catch(
            error => dispatch({ type: LOAD_MENU_FAIL, error })
        );
	};
};

export const toggleMenu = () => {
    return {
        type: TOGGLE_MENU
    }
}

// REDUCERS

const INITIAL_STATE = {
	loaded: false,
	data: [],
    open: false
};

export default (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {

        case TOGGLE_MENU:
        return {
            ...state,
            open: (state.open) ? false : true
        }

		case LOAD_MENU:
        return {
            ...state,
            loading: true
        };

        case LOAD_MENU_SUCCESS:
        return {
            ...state,
            loading: false,
            loaded: true,
            data: action.result,
            error: null
        };

        case LOAD_MENU_FAIL:
        return {
            ...state,
            loading: false,
            loaded: false,
            data: null,
            error: action.error
        };
	}
	return state;
};
