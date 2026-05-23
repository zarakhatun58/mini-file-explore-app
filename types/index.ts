export type NodeType = "folder" | "file";

export interface FSNode {
  id: string;
  name: string;
  type: NodeType;
  content?: string;
  children?: FSNode[];
}