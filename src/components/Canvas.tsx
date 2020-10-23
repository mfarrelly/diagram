import React from "react";

import { fabric } from "fabric";
import * as R from "ramda";

export interface CanvasProps {
    id: string;
    canvasData?: CanvasData;
    onCanvasDataChange?: (data: CanvasData) => void;
}

export interface CanvasItem {
    id: string;
    type: "arrow" | "line" | "box";
    position: fabric.Point;
}

export interface CanvasData {
    items: CanvasItem[];
}

interface CanvasState {
    canvas: fabric.Canvas | null;
}

export class Canvas extends React.Component<CanvasProps, CanvasState> {
    constructor(props: CanvasProps) {
        super(props);
        this.state = {
            canvas: null
        };
    }

    add(position: fabric.Point) {
        if (!this.state.canvas) {
            return;
        }

        const rect = new fabric.Rect({
            left: position.x,
            top: position.y,
            fill: "red",
            width: 20,
            height: 20
        });
        this.state.canvas?.add(rect);
    }

    componentDidUpdate(prevProps: CanvasProps): void {
        if (super.componentDidUpdate) {
            super.componentDidUpdate(prevProps, this.props as any);
        }
        console.error(prevProps, this.props);

        if (this.props.canvasData) {
            const newItems = R.difference(this.props.canvasData?.items ?? [], prevProps.canvasData?.items ?? []);
            for (const item of newItems) {
                this.add(item.position);
            }
        }
    }

    componentDidMount() {
        const canvas = new fabric.Canvas(this.props.id);

        this.setState({ canvas: canvas });
    }

    render() {
        const { id } = this.props;
        return (
            <>
                <canvas id={id} width={1800} height={900} />
            </>
        );
    }
}
