import { EditMenuItems } from "./EditMenuItems";
import { FileMenuItems } from "./FileMenuItems";

export function MenuBar(props: any) {
    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "150px", backgroundColor: "grey" }}>
            <FileMenuItems />
            <EditMenuItems></EditMenuItems>
        </div>
    );
}
