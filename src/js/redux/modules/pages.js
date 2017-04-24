import * as api from 'apiClient';

// TYPES

const LOAD_PAGES = 'LOAD_PAGES';
const LOAD_PAGES_SUCCESS = 'LOAD_PAGES_SUCCESS';
const LOAD_PAGES_FAIL = 'LOAD_PAGES_FAIL';

const LOAD_PAGE = 'LOAD_PAGE';
const LOAD_PAGE_SUCCESS = 'LOAD_PAGE_SUCCESS';
const LOAD_PAGE_FAIL = 'LOAD_PAGE_FAIL';

// ACTIONS

const _isLoaded = (state) => {
    return state.pages && state.pages.loaded;
}

export const load = () => {
    return (dispatch, getState) => {
        if (_isLoaded(getState())) {
            return;
        }

        dispatch({ type: LOAD_PAGES });
        return api.fetchPages()
        .then(
            result => dispatch({ type: LOAD_PAGES_SUCCESS, result })
        )
        .catch(
            error => dispatch({ type: LOAD_PAGES_FAIL, error })
        );
    };
};

export const loadSingle = (slug) => {
    return (dispatch) => {
        dispatch({ type: LOAD_PAGE });
        return api.fetchPage(slug)
        .then(
            result => dispatch({ type: LOAD_PAGE_SUCCESS, result })
        )
        .catch(
            error => dispatch({ type: LOAD_PAGE_FAIL, error })
        );
    };
};

// REDUCERS

const INITIAL_STATE = {
    loaded: false,
    page: {}
};

/*
This module takes care of loading pages data.

We export a load action creator. It dispatches a thunk that uses the API to load a page.
*/
//@TODO: implement re-fetching of possibly outdated student data

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {

        case LOAD_PAGES:
        return {
            ...state,
            loading: true
        };

        case LOAD_PAGES_SUCCESS:
        return {
            ...state,
            loading: false,
            loaded: true,
            data: action.result,
            error: null
        };

        case LOAD_PAGES_FAIL:
        return {
            ...state,
            loading: false,
            loaded: false,
            data: null,
            error: action.error
        };

        case LOAD_PAGE_SUCCESS:
        return {
            ...state,
            page: {
                ...state.page,
                [action.result.slug]: action.result
            }
        };

		case LOAD_PAGE_FAIL:
        return {
            ...state,
            loading: false,
            loaded: false,
            data: null,
            error: action.error
        };
    }
    // Default
    return state;
};
