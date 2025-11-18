import ReactDOM from "react-dom/client";
import App from "./App";
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const store = configureStore({
    reducer: {
        messages: messageReducer,
        blogs: blogReducer,
        user: userReducer
    }
})

ReactDOM.createRoot(document.getElementById("root")).render(
<Provider store={store}>
    <App />
</Provider>
);
