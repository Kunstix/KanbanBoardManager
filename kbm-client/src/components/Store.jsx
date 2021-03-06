import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initalState = {};
const middleware = [thunk];

let store;

const reactDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (window.navigator.userAgent.includes('Chrome') && reactDevTools) {
  store = createStore(
    rootReducer,
    initalState,
    compose(applyMiddleware(...middleware), reactDevTools)
  );
} else {
  store = createStore(
    rootReducer,
    initalState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;
