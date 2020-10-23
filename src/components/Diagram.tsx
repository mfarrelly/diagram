import React from "react";

import { Canvas, CanvasData } from "./Canvas";
import { Button, Paper } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import { fabric } from "fabric";

export function Diagram() {
    const [userData, setUserData] = React.useState<CanvasData>();
    const [currentId, setCurrentId] = React.useState<number>(1);

    const onAdd = React.useCallback(
        (type: string) => {
            setUserData({
                items: (userData?.items ?? []).concat([{ id: `${currentId}`, type: "box", position: new fabric.Point(10, 10) }])
            });
            setCurrentId(currentId+1);
        },
        [userData, currentId]
    );

    return (
        <Paper variant="outlined">
            <ButtonGroup color="primary">
                <Button onClick={() => alert("what")}>Add</Button>
                <Button onClick={() => onAdd("box")}>Box</Button>
            </ButtonGroup>
            <Canvas id="c" canvasData={userData} onCanvasDataChange={setUserData} />;
        </Paper>
    );
}
