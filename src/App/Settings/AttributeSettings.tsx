import { Node } from "@antv/x6";
import FormRender, { useForm } from "form-render";
import { useEffect } from "react";

import { AttributeSchema } from "../../utils/const";

/**
 * 实体属性配置面板
 */
export const AttributeSettings = ({
  selectedNode,
  portId,
}: {
  selectedNode: Node;
  portId: string;
}) => {
  const form = useForm();

  useEffect(() => {
    const port = selectedNode.getPort(portId);
    if (!port?.attrs) {
      return;
    }
    form.setValues({
      name: port.attrs.portNameLabel.text,
      type: port.attrs.portTypeLabel.text,
    });
  }, [portId, selectedNode]);

  const onDataChange = (value: any) => {
    selectedNode.setPortProp(portId, "attrs/portNameLabel/text", value.name);
    selectedNode.setPortProp(portId, "attrs/portTypeLabel/text", value.type);
  };

  return (
    <div className="settings">
      <div className="title">属性配置</div>
      <FormRender
        form={form}
        schema={AttributeSchema}
        watch={{
          "#": (v) => setTimeout(() => onDataChange(v), 0),
        }}
      />
    </div>
  );
};
