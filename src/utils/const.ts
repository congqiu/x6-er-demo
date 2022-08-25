import { SchemaBase } from "form-render";

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 1.5;
export const LINE_HEIGHT = 34;
export const NODE_WIDTH = 200;

export const WIDGETS = [
  {
    name: "Entity",
    type: "er-entity",
    setting: {
      name: {
        title: "实体名称",
        type: "string",
      },
    },
  },
];

export const AttributeSchema: Partial<SchemaBase> = {
  type: "object",
  displayType: "column",
  properties: {
    name: {
      title: "属性名称",
      type: "string",
    },
    type: {
      title: "类型",
      type: "string",
      enum: ["STRING", "NUMBER"],
      widget: "select",
    },
  },
};
