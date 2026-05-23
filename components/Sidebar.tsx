"use client";


import { FSNode } from "../types";
import TreeNode from "./TreeNode";

interface Props {
  tree: FSNode;
  selectedId: string;
  expanded: Record<string, boolean>;
  onSelect: (id: string) => void;
  toggleFolder: (id: string) => void;
  sidebarOpen: boolean;
}

export default function Sidebar({
  tree,
  selectedId,
  expanded,
  onSelect,
  toggleFolder,
  sidebarOpen,
}: Props) {
  return (
    <aside
      className={`${
        sidebarOpen
          ? "absolute z-50 bg-white h-full w-[320px]"
          : "hidden"
      } md:block md:relative md:w-[340px] border-r bg-[#fafafa] p-3 overflow-auto`}
    >
      <TreeNode
        node={tree}
        selectedId={selectedId}
        expanded={expanded}
        onSelect={onSelect}
        toggleFolder={toggleFolder}
      />
    </aside>
  );
}