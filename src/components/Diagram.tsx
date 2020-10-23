import React from "react";

import { Canvas, CanvasData, CanvasItem } from "./Canvas";
import { Button, Paper } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import { fabric } from "fabric";
import { append } from "ramda";

export function Diagram() {
    const [userData, setUserData] = React.useState<CanvasData>();
    const [currentId, setCurrentId] = React.useState<number>(1);

    const onAdd = React.useCallback(
        (type: string) => {
            if (type === "box") {
                const newItems = append(
                    { id: `${currentId}`, type: "box", position: new fabric.Point(10, 10) },
                    userData?.items ?? []
                ) as CanvasItem[];

                setUserData({
                    items: newItems
                });
            }
            else if (type === "circle") {
                const newItems = append(
                    { id: `${currentId}`, type: "circle", position: new fabric.Point(10, 10) },
                    userData?.items ?? []
                ) as CanvasItem[];

                setUserData({
                    items: newItems
                });
            }
            setCurrentId(currentId + 1);
        },
        [userData, currentId]
    );

    return (
        <Paper variant="outlined">
            <ButtonGroup color="primary">
                <Button onClick={() => alert("what")}>Add</Button>
                <Button onClick={() => onAdd("box")}>Box</Button>
                <Button onClick={() => onAdd("circle")}>Circle</Button>
            </ButtonGroup>
            <Canvas id="c" canvasData={userData} onCanvasDataChange={setUserData} />;
        </Paper>
    );
}
