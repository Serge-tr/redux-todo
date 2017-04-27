let redux = require('redux');
let thunk = require('redux-thunk').default;
let {searchReducer, todoReducer, mapReducer} = require('./../reducers/index');

export let configure = () => {
    let reducer = redux.combineReducers({
        searchText: searchReducer,
        todos: todoReducer,
        map: mapReducer
    });

    let store = redux.createStore(reducer, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};