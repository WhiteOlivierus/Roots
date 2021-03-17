import { Divider } from "@material-ui/core";

import { MenuButton } from "./MenuButton";

export const MenuButtons = (props) => {
    return (
        <div>
            {props.buttons.map((button, index) => {
                if ("divide" in button) {
                    return <Divider key={index} />;
                } else {
                    return <MenuButton key={index} button={button} />;
                }
            })}
        </div>
    );
};
