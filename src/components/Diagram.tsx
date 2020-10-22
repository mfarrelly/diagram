import React from "react";

import { fabric } from "fabric";
import { Canvas } from "./Canvas";

export function Diagram() {
    // const canvasDiv = <canvas></canvas>;
    // const canvas = new fabric.Canvas(canvasDiv);

    // // create a rectangle object
    // const rect = new fabric.Rect({
    //     left: 100,
    //     top: 100,
    //     fill: "red",
    //     width: 20,
    //     height: 20
    // });

    // // "add" rectangle onto canvas
    // canvas.add(rect);

    return <div className="canvas-items"><Canvas id="c"/></div>;
}
