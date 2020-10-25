import React from "react";

import { fabric } from "fabric";
import * as R from "ramda";

export interface CanvasProps {
    id: string;
    canvasData?: CanvasData;
    onCanvasDataChange?: (data: CanvasData) => void;
}

export type CanvasEventType = "arrow" | "line" | "box" | "circle";

export interface CanvasEvent {
    id: string;
    type: CanvasEventType;
    position: fabric.Point;
    color: string;
    size: number;
}

export interface CanvasData {
    items: CanvasEvent[];
}

interface CanvasActionEvent {
    do: (_: CanvasEvent) => void;
    type: string;
}

interface CanvasState {
    canvas: fabric.Canvas | null;
    eventTypes: Record<string, CanvasActionEvent> | undefined;
}

export class Canvas extends React.Component<CanvasProps, CanvasState> {
    constructor(props: CanvasProps) {
        super(props);
        this.state = {
            canvas: null,
            eventTypes: undefined
        };
    }

    registerEventTypes() {
        const x: Record<string, CanvasActionEvent> = {
            "box": {
                type: "box",
                do: (event: CanvasEvent) => {
                    const { position } = { ...event };
                    const rect = new fabric.Rect({
                        left: position.x,
                        top: position.y,
                        fill: event.color,
                        width: event.size,
                        height: event.size
                    });
                    this.state.canvas?.add(rect);
                }
            },
            "circle": {
                type: "circle",
                do: event => {
                    const { position } = { ...event };
                    const rect = new fabric.Circle({
                        left: position.x,
                        top: position.y,
                        fill: event.color,
                        radius: event.size
                    });
                    this.state.canvas?.add(rect);
                }
            },
            "line": {
                type: "line",
                do: event => {
                    const { position } = { ...event };
                    const line = new fabric.Line([position.x, position.y, position.x + 150, position.y], {
                        fill: event.color,
                        stroke: event.color,
                        strokeWidth: event.size
                    });
                    this.state.canvas?.add(line);
                }
            }
        };

        this.setState({ ...this.state, eventTypes: x });
    }

    /**
     * Process a CanvasEvent.
     *
     *
     */
    addEvent(item: CanvasEvent) {
        if (!this.state.canvas) {
            return;
        }

        this.state.eventTypes?.[item.type]?.do(item);
    }

    componentDidUpdate(prevProps: CanvasProps): void {
        if (super.componentDidUpdate) {
            super.componentDidUpdate(prevProps, this.props as any);
        }

        if (this.props.canvasData) {
            const events = R.difference(this.props.canvasData?.items ?? [], prevProps.canvasData?.items ?? []);
            for (const event of events) {
                this.addEvent(event);
            }
        }
    }

    componentDidMount() {
        const canvas = new fabric.Canvas(this.props.id);

        this.registerEventTypes();
        this.setState({ canvas: canvas });
    }

    render() {
        const { id } = this.props;
        return (
            <>
                <canvas id={id} width={900} height={300} />
            </>
        );
    }
}
