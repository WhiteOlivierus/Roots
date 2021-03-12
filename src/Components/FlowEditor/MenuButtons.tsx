import { Divider } from "@material-ui/core";

import React from "react";
import { MenuButton } from "./MenuButton";

export function MenuButtons(props) {
    return (
        <div>
            {props.buttons.map(function (button: any, index) {
                if ("divide" in button) {
                    return <Divider key={index} />;
                } else {
                    return <MenuButton key={index} button={button} />;
                }
            })}
        </div>
    );
}
