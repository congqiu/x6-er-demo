import { Graph } from "@antv/x6";

import { MAX_ZOOM, MIN_ZOOM, LINE_HEIGHT, NODE_WIDTH } from "./const";

// 自定义布局算法
Graph.registerPortLayout(
  "erPortPosition",
  (portsPositionArgs) => {
    return portsPositionArgs.map((_, index) => {
      return {
        position: {
          x: 0,
          y: (index + 1) * LINE_HEIGHT,
        },
        angle: 0,
      };
    });
  },
  true
);

// 便捷方法注册节点
Graph.registerNode(
  "er-entity",
  {
    inherit: "rect",
    width: NODE_WIDTH,
    height: LINE_HEIGHT,
    attrs: {
      body: {
        // 定义body选择器的样式
        strokeWidth: 1,
        stroke: "#5F95FF",
        fill: "#5F95FF",
      },
      label: {
        // 定义label选择器的样式
        fontWeight: "bold",
        fill: "#ffffff",
        fontSize: 12,
      },
    },
    ports: {
      groups: {
        list: {
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
            {
              tagName: "text",
              selector: "portNameLabel",
            },
            {
              tagName: "text",
              selector: "portTypeLabel",
            },
          ],
          attrs: {
            portBody: {
              width: NODE_WIDTH,
              height: LINE_HEIGHT,
              strokeWidth: 1,
              stroke: "#5F95FF",
              fill: "#EFF4FF",
              magnet: true,
              event: "node:port-click",
            },
            portNameLabel: {
              ref: "portBody",
              refX: 6,
              refY: 12,
              fontSize: 10,
              event: "node:port-click",
            },
            portTypeLabel: {
              ref: "portBody",
              refX: 125,
              refY: 12,
              fontSize: 10,
              event: "node:port-click",
            },
          },
          position: "erPortPosition", // 标签位置
        },
      },
    },
  },
  true
);

export const createGraph = (container: HTMLDivElement): Graph => {
  const graph = new Graph({
    container,
    rotating: false,
    resizing: false,
    clipboard: {
      enabled: true,
      useLocalStorage: true,
    },
    connecting: {
      snap: true,
      dangling: true,
      highlight: true,
      anchor: "center",
      connectionPoint: "anchor",
      allowBlank: false,
      router: {
        name: "manhattan",
      },
      validateConnection({
        sourceView,
        targetView,
        sourceMagnet,
        targetMagnet,
      }) {
        if (!sourceMagnet) {
          return false;
        } else if (!targetMagnet) {
          return false;
        }
        return sourceView !== targetView;
      },
    },
    background: {
      color: "#f8f9fa",
    },
    grid: {
      visible: true,
    },
    selecting: {
      enabled: true,
      multiple: false,
      movable: true,
    },
    snapline: {
      enabled: true,
      clean: 100,
    },
    keyboard: {
      enabled: true,
      global: false,
    },
    history: {
      enabled: true,
    },
    scroller: {
      enabled: true,
    },
    mousewheel: {
      enabled: true,
      minScale: MIN_ZOOM,
      maxScale: MAX_ZOOM,
      modifiers: ["ctrl", "meta"],
    },
  });
  return graph;
};
