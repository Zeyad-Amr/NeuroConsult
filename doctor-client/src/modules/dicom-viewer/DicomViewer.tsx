import React, { useState, useEffect, ChangeEvent } from "react";
import cornerstone from "cornerstone-core";
import dicomParser from "dicom-parser";
import CornerstoneViewport from "react-cornerstone-viewport";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

type ToolConfig = {
  name: string;
  mode: string;
  modeOptions?: {
    mouseButtonMask: number;
  };
};

type Config = {
  activeViewportIndex: number;
  viewports: number[];
  tools: (ToolConfig | string)[];
  imageIds: string[];
  activeTool: string;
  imageIdIndex: number;
  isPlaying: boolean;
  frameRate: number;
};

const initialConfig: Config = {
  activeViewportIndex: 0,
  viewports: [0],
  tools: [
    { name: "Wwwc", mode: "active", modeOptions: { mouseButtonMask: 1 } },
    { name: "Zoom", mode: "active", modeOptions: { mouseButtonMask: 2 } },
    { name: "Pan", mode: "active", modeOptions: { mouseButtonMask: 4 } },
    "Length",
    "Angle",
    "Bidirectional",
    "FreehandRoi",
    "Eraser",
    { name: "StackScrollMouseWheel", mode: "active" },
    { name: "PanMultiTouch", mode: "active" },
    { name: "ZoomTouchPinch", mode: "active" },
    { name: "StackScrollMultiTouch", mode: "active" },
  ],
  imageIds: [],
  activeTool: "Wwwc",
  imageIdIndex: 0,
  isPlaying: false,
  frameRate: 1,
};

const createImageIDs = (): string[] => {
  const MyImageIds: string[] = [];

  for (let i = 0; i < 5; i++) {
    MyImageIds.push(
      `wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT00000${i}.dcm`
    );
  }

  return MyImageIds;
};

const DicomViewer: React.FC = () => {
  const myIDs = createImageIDs();

  initialConfig.imageIds = myIDs;

  const [config, setConfig] = useState<Config>(initialConfig);
  const [isImageIDs, setIsImageIDs] = useState<boolean>(false);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
      console.log(imageId, "imageId");

      setConfig((prevConfig) => ({
        ...prevConfig,
        imageIds: [...prevConfig.imageIds, imageId],
      }));
    }
  };

  useEffect(() => {
    if (config.imageIds.length > 0) {
      setIsImageIDs(true);
    }
  }, [config.imageIds]);

  return (
    // <div style={{ backgroundColor: "black", height: "100vh", width: "100%" }}>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        height: "512px",
      }}
    >
      <input type="file" accept=".dcm" onChange={handleFileInputChange} />

      {isImageIDs &&
        config.imageIds &&
        config.viewports.map((viewportIndex) => (
          <div
            key={viewportIndex}
            style={{ flex: "1", display: "flex", flexDirection: "row" }}
          >
            <CornerstoneViewport
              style={{ flex: "1", minWidth: "720px", height: "470px" }}
              tools={config.tools}
              imageIds={config.imageIds}
              imageIdIndex={config.imageIdIndex}
              isPlaying={config.isPlaying}
              frameRate={config.frameRate}
              className={
                config.activeViewportIndex === viewportIndex ? "active" : ""
              }
              activeTool={config.activeTool}
              setViewportActive={() => {
                setConfig((prevConfig) => ({
                  ...prevConfig,
                  activeViewportIndex: viewportIndex,
                }));
              }}
            />
          </div>
        ))}
    </div>
    // </div>
  );
};

export default DicomViewer;
