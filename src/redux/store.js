import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import studentreducer from '../redux/students/slice'

const rootReducer = {
    student: studentreducer
};

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
});

export default configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware
});