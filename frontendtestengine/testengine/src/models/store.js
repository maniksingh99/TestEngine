import {createStore} from 'redux';
import {reducerOperations} from './reducers/reduceroperations';

export const store=createStore(reducerOperations);
store.subscribe(()=>{
    console.log('Subscribe......',store.getState());
})