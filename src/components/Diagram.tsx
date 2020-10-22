import React from "react";

import { fabric } from "fabric";

export function Diagram() {
    var canvas = new fabric.Canvas('c');

    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });
    
    // "add" rectangle onto canvas
    canvas.add(rect);


    return (
        <div className="canvas-items">
            <canvas id="c" />
        </div>
    );
}
