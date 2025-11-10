import ReactDOM from "react-dom/client";
import App from "./App";
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import blogs from "./services/blogs";

const store = configureStore({
    reducer: {
        messages: messageReducer,
        blogs: blogReducer
    }
})

ReactDOM.createRoot(document.getElementById("root")).render(
<Provider store={store}>
    <App />
</Provider>
);
