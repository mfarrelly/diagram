import React from "react";

import { fabric } from "fabric";

export interface CanvasProps {
    id: string;
}
export class Canvas extends React.Component<CanvasProps> {
    constructor(props: CanvasProps) {
        super(props);
        this.state = {
            canvas: null
        };
    }
    componentDidMount() {
        const canvas = new fabric.Canvas(this.props.id);

        // create a rectangle object
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: "red",
            width: 20,
            height: 20
        });

        canvas.add(rect);
    }

    render() {
        const { id, children } = this.props;
        return (
            <>
                <canvas id={id} />
            </>
        );
    }
}

