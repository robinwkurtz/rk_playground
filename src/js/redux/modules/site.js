import * as api from 'apiClient';

// TYPES

const LOAD_SITE_INFO = 'LOAD_SITE_INFO';
const LOAD_SITE_INFO_SUCCESS = 'LOAD_SITE_INFO_SUCCESS';
const LOAD_SITE_INFO_FAIL = 'LOAD_SITE_INFO_FAIL';

// ACTIONS

const _isLoaded = (state) => {
    return state.site && state.site.loaded;
}

export const load = () => {
    return (dispatch, getState) => {
        if (_isLoaded(getState())) {
            return;
        }
        dispatch({ type: LOAD_SITE_INFO });
        return api.fetchSiteInfo()
        .then(
            result => dispatch({ type: LOAD_SITE_INFO_SUCCESS, result })
        )
        .catch(
            error => dispatch({ type: LOAD_SITE_INFO_FAIL, error })
        );
    };
};


// REDUCERS

const INITIAL_STATE = {
    loaded: false,
};

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {

        case LOAD_SITE_INFO:
        return {
            ...state,
            loading: true
        };

        case LOAD_SITE_INFO_SUCCESS:
        return {
            ...state,
            loading: false,
            loaded: true,
            data: action.result,
            error: null
        };

        case LOAD_SITE_INFO_FAIL:
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
