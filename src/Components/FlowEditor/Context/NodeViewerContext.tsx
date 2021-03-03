import { createContext, useContext } from "react";

import createEngine, {
    DiagramEngine,
    DiagramModel,
    DiagramModelGenerics,
} from "@projectstorm/react-diagrams";

export class NodeViewerState {
    model: DiagramModel<DiagramModelGenerics> = new DiagramModel();
    engine: DiagramEngine = createEngine();
    projectFile: any = undefined;
}

export type NodeViewerContextType = {
    nodeViewerState: NodeViewerState;
    setNodeViewerState: (nodeViewerState: NodeViewerState) => void;
};

export const NodeViewerContext = createContext<NodeViewerContextType>({
    nodeViewerState: new NodeViewerState(),
    setNodeViewerState: (nodeViewerState) => console.warn("no node viewer"),
});

export const useNodeViewerState = () => useContext(NodeViewerContext);
