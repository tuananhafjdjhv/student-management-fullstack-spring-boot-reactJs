
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./redux/configureStore.jsx";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const store = configureStore;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={true} />
        <App />
    </Provider>
  </BrowserRouter>
);
