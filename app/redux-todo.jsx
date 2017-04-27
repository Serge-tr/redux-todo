let redux = require('redux'),
    actions = require('./actions/index'),
    store = require('./store/configureStore').configure();


store.subscribe(() => {
   let state = store.getState();

   if(state.map.isFetching) {
       document.getElementById('app').innerHTML = 'Loading...';
   } else if (state.map.url) {
       document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
   }
});

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeSearchText('Who is that?!'));
store.dispatch(actions.addTodo('Kissing'));
store.dispatch(actions.addTodo('Drinking all the beer'));

store.dispatch(actions.removeTodo(1));

console.log(store.getState());