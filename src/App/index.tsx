import { Graph, JQuery, Node, NodeView } from "@antv/x6";
import { Button, message } from "antd";
import { useEffect, useRef, useState } from "react";

import { createGraph } from "../utils/createGraph";

import { AttributeSettings, NodeSettings } from "./Settings";
import { Toolbox } from "./Toolbox";

import "./index.less";

const STORAGE_KEY = "er-json";

export const App = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<Graph | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedPort, setSelectedPort] = useState<string>();

  useEffect(() => {
    if (graphRef.current) {
      const graph = createGraph(graphRef.current);
      graph.on("node:selected", ({ node }) => {
        setSelectedNode(node);
      });
      graph.on("node:unselected", () => {
        setSelectedNode(null);
      });
      graph.on("node:added", ({ node }) => {
        graph.resetSelection(node);
      });
      graph.on("blank:click", () => {
        setSelectedPort(undefined);
      });
      // 监听点击了连接点 https://github.com/antvis/X6/issues/2432
      // 没找到合适的方法取消选中
      graph.on(
        "node:port-click",
        ({ e, node }: NodeView.PositionEventArgs<JQuery.ClickEvent>) => {
          e.stopPropagation();
          const id = e.currentTarget.parentElement.getAttribute("port");
          setSelectedNode(node);
          setSelectedPort(id);
        }
      );
      graph.on("node:click", (args) => {
        setSelectedNode(args.node);
        setSelectedPort(undefined);
      });
      try {
        const json = localStorage.getItem(STORAGE_KEY);
        if (json) {
          graph.fromJSON(JSON.parse(json));
        }
      } catch (error) {
        //
      }
      setGraph(graph);
      return () => {
        graph?.dispose();
      };
    }
  }, []);

  const save = () => {
    const json = graph?.toJSON();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
    message.success("保存成功");
  };

  return (
    <div className="entity-relationship">
      <header>
        <div>在线绘制 ER 图</div>
        <div className="operation">
          <Button className="save" type="primary" onClick={save}>
            保存
          </Button>
        </div>
      </header>
      <main>
        <div className="left">{graph ? <Toolbox target={graph} /> : null}</div>
        <div className="center">
          <div className="graph" ref={graphRef}></div>
        </div>
        <div className="right">
          {selectedNode && !selectedPort ? (
            <NodeSettings selectedNode={selectedNode} />
          ) : null}
          {selectedNode && selectedPort ? (
            <AttributeSettings
              selectedNode={selectedNode}
              portId={selectedPort}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
};
