import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const FabricPanel = () => {
    // States for Canvas
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
            const fabricCanvas = new fabric.Canvas(canvasRef.current, {
                fireMiddleClick: true,
                stopContextMenu: true, 
                selection: true,
                preserveObjectStacking: true
            });
    
            setCanvas(fabricCanvas);
    
            fabricCanvas.backgroundColor = '#131313';
            fabricCanvas.renderAll();

            return () => {
                fabricCanvas.dispose();
            };
        }
    }, []);

    // Load and center SVG on the canvas
    useEffect(() => {
        if (canvas) {
            fabric.loadSVGFromURL('/images/bnb.svg', (objects, options) => {
                const svg = fabric.util.groupSVGElements(objects, options);
                // Add the SVG to the canvas and render
                canvas?.add(svg);
                canvas?.renderAll();
            });
        }
    }, [canvas]);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <canvas ref={canvasRef} width="800" height="600" />
        </div>
    );
};

export default FabricPanel;
