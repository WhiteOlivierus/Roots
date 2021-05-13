import useEventListener from "./Utilities/UseEventListener";

import GlobalProvider from "./GlobalProviders";
import GlobalRoutes from "./GlobalRoutes";

const App = () => {
    useEventListener("contextmenu", (e) => e.preventDefault());

    return (
        <GlobalProvider>
            <GlobalRoutes />
        </GlobalProvider>
    );
};

App.displayName = "App";

export default App;
