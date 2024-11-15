// redux
import {
  TypedUseSelectorHook,
  useSelector as useAppSelector,
  useDispatch as useAppDispatch,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReduces';

// ----------------------------------------------------------------------

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
});

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

const useDispatch = () => useAppDispatch<AppDispatch>();

export { store, useDispatch, useSelector, dispatch };
