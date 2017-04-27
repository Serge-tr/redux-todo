let redux = require('redux'),
    stateDefault = {
        searchText: '',
        showCompleted: false,
        todos: []
    };


let reducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.searchText
            };
        default:
            return state;
    }
};
let store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.subscribe(() => {
   let state = store.getState();

   document.getElementById('app').innerHTML = state.searchText;
});

store.dispatch({
    type: "CHANGE_SEARCH_TEXT",
    searchText: "Serge good!"
});

store.dispatch({
    type: "CHANGE_SEARCH_TEXT",
    searchText: "Valery good!"
});

console.log(store.getState());