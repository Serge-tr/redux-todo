let redux = require('redux'),
    axios = require('axios');

// Search reducer and action generators
// ----------------------
let searchReducer = (state = "John", action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
};

let changeSearchText = (searchText) => {
    return {
        type: 'CHANGE_SEARCH_TEXT',
        searchText
    }
};

// Todos reducer and action generators
// ----------------------
let nextTodo = 1;
let todoReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODOS':
            return [
                ...state,
                {
                    id: nextTodo++,
                    todo: action.todo
                }
            ];
        case 'REMOVE_TODO':
            return state.filter((todo) => todo.id !== action.id);

        default:
            return state;
    }
};

let addTodo = (todo) => {
    return {
        type: 'ADD_TODOS',
        todo
    }
};
let removeTodo = (id) => {
    return {
        type: 'REMOVE_TODO',
        id
    }
};

// Map reducer and action generators
// ----------------------

let mapReducer = (state = {isFetching: false, url: undefined}, action) => {
    switch (action.type) {
        case 'START_LOCATION_FETCH':
            return {
                isFetching: true,
                url: undefined
            };
        case 'COMPLETE_LOCATION_FETCH':
            return {
                isFetching: false,
                url: action.url
            };
        default:
            return state;
    }
};

let startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
};
let completeLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    }
};

let fetchLocation = () => {
    store.dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then(function (res) {
       let loc = res.data.loc;
       let baseUrl = 'http://maps.google.com?q=';

       store.dispatch(completeLocationFetch(baseUrl + loc));
    });
};

let reducer = redux.combineReducers({
    searchText: searchReducer,
    todos: todoReducer,
    map: mapReducer
});

let store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.subscribe(() => {
   let state = store.getState();

   if(state.map.isFetching) {
       document.getElementById('app').innerHTML = 'Loading...';
   } else if (state.map.url) {
       document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
   }
});

fetchLocation();

store.dispatch(changeSearchText('Who is that?!'));
store.dispatch(addTodo('Kissing'));
store.dispatch(addTodo('Drinking all the beer'));

store.dispatch(removeTodo(1));

console.log(store.getState());