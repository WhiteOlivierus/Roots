import { Divider } from "@material-ui/core";

import { MenuButton } from "./MenuButton";
import PropTypes from "prop-types";
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
MenuButtons.displayName = "MenuButtons";
MenuButtons.propTypes = { buttons: PropTypes.object.isRequired };
export default MenuButtons;
