export  let searchReducer = (state = "John", action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
};

let nextTodo = 1;
export let todoReducer = (state = [], action) => {
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

export let mapReducer = (state = {isFetching: false, url: undefined}, action) => {
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