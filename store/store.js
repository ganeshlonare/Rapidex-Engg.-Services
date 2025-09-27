import { combineReducers, configureStore } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"
import createWebStorage from "redux-persist/lib/storage/createWebStorage"
import authReducer from "./reducer/authReducer"
import cartReducer  from "./reducer/cartReducer"

const rootReducer = combineReducers({
    authStore: authReducer,
    cartStore: cartReducer
})


const persistConfig = {
    key: 'root',
    // Use SSR-safe storage: web storage on client, noop storage on server
    storage: typeof window !== 'undefined'
        ? createWebStorage('local')
        : {
            getItem() { return Promise.resolve(null) },
            setItem() { return Promise.resolve() },
            removeItem() { return Promise.resolve() }
        }
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)