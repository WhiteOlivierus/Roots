import * as React from "react";
import { DiamondNodeModel } from "./DiamondNodeModel";
import { DiagramEngine, PortModelAlignment, PortWidget } from "@projectstorm/react-diagrams";
import styled from "@emotion/styled";

export interface DiamondNodeWidgetProps {
    node: DiamondNodeModel;
    engine: DiagramEngine;
    size?: number;
    image?: string;
}

interface SceneNodeProps {
    readonly image?: string;
}

export const Port = styled.div`
    width: 16px;
    height: 16px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background: rgba(0, 0, 0, 1);
    }
`;

const Node = styled.div<SceneNodeProps>`
    position: relative;
    width: 160px;
    height: 90px;
    background-color: blue;
    background-image: ${(props) => props.image};

    &:hover {
        background-color: lightcoral;
    }
`;

export class SceneNodeWidget extends React.Component<DiamondNodeWidgetProps> {
    render() {
        return (
            <Node image={this.props.image}>
                <PortWidget port={this.props.node.getPort(PortModelAlignment.LEFT)} engine={this.props.engine}>
                    <Port />
                </PortWidget>

                <PortWidget port={this.props.node.getPort(PortModelAlignment.RIGHT)} engine={this.props.engine}>
                    <Port />
                </PortWidget>
            </Node>
        );
    }
}
