"use client";

import {
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
} from "lucide-react";
import { FSNode } from "../types";



interface Props {
  node: FSNode;
  selectedId: string;
  expanded: Record<string, boolean>;
  onSelect: (id: string) => void;
  toggleFolder: (id: string) => void;
  level?: number;
}

export default function TreeNode({
  node,
  selectedId,
  expanded,
  onSelect,
  toggleFolder,
  level = 0,
}: Props) {
  const isFolder = node.type === "folder";

  return (
    <div>
      <button
        onClick={() => {
          onSelect(node.id);

          if (isFolder) {
            toggleFolder(node.id);
          }
        }}
        style={{
          paddingLeft: `${level * 14 + 10}px`,
        }}
        className={`w-full flex items-center gap-2 py-2 rounded-xl text-left hover:bg-blue-50 ${
          selectedId === node.id
            ? "bg-blue-100 text-blue-700"
            : ""
        }`}
      >
        {isFolder ? (
          expanded[node.id] ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )
        ) : (
          <div className="w-4" />
        )}

        {isFolder ? (
          <Folder className="w-5 h-5 text-yellow-500" />
        ) : (
          <FileText className="w-5 h-5 text-gray-500" />
        )}

        <span>{node.name}</span>
      </button>

      {isFolder &&
        expanded[node.id] &&
        node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            selectedId={selectedId}
            expanded={expanded}
            onSelect={onSelect}
            toggleFolder={toggleFolder}
            level={level + 1}
          />
        ))}
    </div>
  );
}