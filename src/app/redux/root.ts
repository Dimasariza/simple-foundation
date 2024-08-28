import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { QuickTabsReducer } from './reducer/quick-tab-reducer';
import { ReplyMessageReducer } from './reducer/input-message-reducer';

const rootReducer = combineReducers({
    QuickTabsReducer,
    ReplyMessageReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export { store, persistor }