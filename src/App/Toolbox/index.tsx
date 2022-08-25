import { Addon, Graph, Node } from "@antv/x6";
import { Collapse } from "antd";
import classNames from "classnames";
import { useMemo } from "react";

import { createName } from "../../utils/common";
import { WIDGETS } from "../../utils/const";

import "./index.less";

export interface IWidget {
  type: string;
  name: string;
}

const { Panel } = Collapse;

export const Toolbox = ({ target }: { target: Graph }) => {
  const dnd = useMemo(
    () =>
      new Addon.Dnd({
        target,
        scaled: false,
        getDropNode(node) {
          const type = node.getData();
          const names = target.getNodes().map((n) => n.data.name);
          const name = createName(names, "entity");
          // 放到画布上实际的节点
          return Node.create({
            shape: type,
            label: name,
            data: { name },
          });
        },
      }),
    [target]
  );

  return (
    <div className="toolbox">
      <Collapse className={"collapse"} defaultActiveKey={["general"]}>
        <Panel key={"general"} header={"通用"}>
          <div className={"panel-content"}>
            {WIDGETS.map((widget) => (
              <Widget key={widget.type} widget={widget} dnd={dnd} />
            ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

const Widget = ({ dnd, widget }: { dnd: Addon.Dnd; widget: IWidget }) => {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    const type = target.getAttribute("data-type");
    dnd.start(
      // 拖入过程中的节点和在组件列表中的还是一样的
      Node.create({
        width: 100,
        height: 40,
        attrs: {
          label: {
            text: "Rect",
            fill: "#6a6c8a",
          },
          body: {
            stroke: "#31d0c6",
            strokeWidth: 2,
          },
        },
        data: type,
      }),
      e.nativeEvent
    );
  };
  return (
    <div
      data-type={widget.type}
      className={classNames("widget-item", widget.type)}
      onMouseDown={onMouseDown}
    >
      {widget.name}
    </div>
  );
};
