// REDUX
import {
    combineReducers,
    configureStore,
    ConfigureStoreOptions,
    PreloadedStateShapeFromReducersMapObject,
    ReducerFromReducersMapObject,
} from '@reduxjs/toolkit';
import { Reducer } from 'redux';
import { enableMapSet } from 'immer';

// REDUX PERSIST
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import {ApplicationSlice, applicationSlice} from "@/redux/slices/applicationSlice.ts";
import {TenantSlice, tenantSlice} from "@/redux/slices/tenantSlice.ts";

type IRootState = {
    application: ApplicationSlice;
    tenant: TenantSlice;
}

const persistConfig: PersistConfig<IRootState> = {
    key: 'root',
    storage: storageSession,
    whitelist: ['application'],
};

const rootReducer = combineReducers({
    application: applicationSlice,
    tenant: tenantSlice,
})

const persistedReducer: Reducer<IRootState> = persistReducer(persistConfig, rootReducer) as ReducerFromReducersMapObject<IRootState>;

const storeOptions: ConfigureStoreOptions<IRootState> = {
    reducer: persistedReducer,
    middleware: (defaultMiddleware) =>
        defaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
    devTools: true,
    preloadedState: undefined as unknown as PreloadedStateShapeFromReducersMapObject<IRootState>
};

enableMapSet();

export const store = configureStore(storeOptions);
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);