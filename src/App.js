import { ContextMenu } from "./Utilities/ContextMenu";

import { GlobalProvider } from "./GlobalProviders";
import { GlobalRoutes } from "./GlobalRoutes";
import { memo } from "react";

export const App = memo(() => {
    return (
        <GlobalProvider>
            <ContextMenu />
            <GlobalRoutes />
        </GlobalProvider>
    );
});
