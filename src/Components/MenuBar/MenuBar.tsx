import { EditMenuItems } from "./EditMenuItems";
import { FileMenuItems } from "./FileMenuItems";
import { MenuItem } from "./MenuItem";

import { Link } from "react-router-dom";

export function MenuBar(props: any) {
    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "150px", backgroundColor: "grey" }}>
            <FileMenuItems />
            <EditMenuItems></EditMenuItems>
            <ul>
                <Link to="/preview">
                    <MenuItem>Preview</MenuItem>
                </Link>
            </ul>
        </div>
    );
}
