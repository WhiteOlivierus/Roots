import React from "react";

export class ContextMenu extends React.Component {
    state = {
        visible: false,
    };
    root: any = document.getElementById("root");

    componentDidMount() {
        document.addEventListener("contextmenu", this._handleContextMenu);
        document.addEventListener("click", this._handleClick);
        document.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        document.removeEventListener("contextmenu", this._handleContextMenu);
        document.removeEventListener("click", this._handleClick);
        document.removeEventListener("scroll", this._handleScroll);
    }

    _handleContextMenu = (event: any) => {
        event.preventDefault();
    };

    _handleClick = (event: any) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);

        if (wasOutside && visible) this.setState({ visible: false });
    };

    _handleScroll = () => {
        const { visible } = this.state;

        if (visible) this.setState({ visible: false });
    };

    render() {
        const { visible } = this.state;

        return (
            (visible || null) && (
                <div
                    ref={(ref) => {
                        this.root = ref;
                    }}
                    className="contextMenu"
                >
                    {this.props.children}
                </div>
            )
        );
    }
}
