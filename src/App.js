import useEventListener from "./Utilities/UseEventListener";

import GlobalProvider from "./GlobalProviders";
import GlobalRoutes from "./GlobalRoutes";

const App = () => {
    useEventListener("contextmenu", (event) => event.preventDefault());

    return (
        <GlobalProvider>
            <GlobalRoutes />
        </GlobalProvider>
    );
};

App.displayName = "App";

export default App;
