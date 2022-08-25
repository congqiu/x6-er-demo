import { Node } from "@antv/x6";
import { Button } from "antd";
import FormRender, { useForm } from "form-render";
import { useEffect, useState } from "react";

import { createName } from "../../utils/common";
import { WIDGETS } from "../../utils/const";

function getSchema(type: string) {
  const widget = WIDGETS.find((widget) => widget.type === type);
  const schema = { ...widget?.setting };
  return schema;
}

/**
 * 实体节点配置面板
 */
export const NodeSettings = ({ selectedNode }: { selectedNode: Node }) => {
  const form = useForm();
  const [settingSchema, setSettingSchema] = useState<any>({
    type: "object",
    displayType: "column",
    properties: {},
  });

  useEffect(() => {
    setSettingSchema({
      type: "object",
      displayType: "column",
      properties: getSchema(selectedNode.shape),
    });
    setTimeout(() => {
      form.setValues(selectedNode.data);
    }, 0);
  }, [selectedNode]);

  const onDataChange = (value: any) => {
    selectedNode.setData(value);
    selectedNode.attr("text/text", value.name);
  };

  const addAttribute = () => {
    const names: string[] = [];
    selectedNode.getPortsByGroup("list").forEach((v) => {
      names.push(v.attrs!.portNameLabel.text as string);
    });
    selectedNode.addPort({
      group: "list",
      attrs: {
        portNameLabel: {
          text: createName(names, "attribute"),
        },
        portTypeLabel: {
          text: "STRING",
        },
      },
    });
  };

  return (
    <div className="settings">
      <div className="title">实体配置</div>
      <FormRender
        form={form}
        schema={settingSchema}
        watch={{
          "#": (v) => setTimeout(() => onDataChange(v), 0),
        }}
      />
      <div className="add">
        <Button onClick={addAttribute}>添加属性</Button>
      </div>
    </div>
  );
};
