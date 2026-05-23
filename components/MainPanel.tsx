"use client";

import {
  FilePlus,
  Folder,
  FolderPlus,
} from "lucide-react";


import FileCard from "./FileCard";
import FileEditor from "./FileEditor";
import { FSNode, NodeType } from "../types";

interface Props {
  selectedNode: FSNode;
  createItem: (type: NodeType) => void;
  renameItem: (node: FSNode) => void;
  deleteItem: (node: FSNode) => void;
  openItem: (id: string) => void;
  updateFile: (value: string) => void;
}

export default function MainPanel({
  selectedNode,
  createItem,
  renameItem,
  deleteItem,
  openItem,
  updateFile,
}: Props) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {selectedNode.type === "folder" ? (
            <Folder className="text-yellow-500 w-8 h-8" />
          ) : null}

          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {selectedNode.name}
            </h2>

            {selectedNode.type === "folder" && (
              <p className="text-gray-500 text-sm">
                {selectedNode.children?.length || 0} items
              </p>
            )}
          </div>
        </div>

        {selectedNode.type === "folder" && (
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => createItem("folder")}
              className="border px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <FolderPlus size={18} />
              Folder
            </button>

            <button
              onClick={() => createItem("file")}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <FilePlus size={18} />
              File
            </button>
          </div>
        )}
      </div>

      {selectedNode.type === "folder" ? (
        <>
          {selectedNode.children?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
              <Folder className="w-16 h-16 mb-3" />
              <p>This folder is empty</p>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {selectedNode.children?.map((item) => (
                <FileCard
                  key={item.id}
                  item={item}
                  onOpen={() => openItem(item.id)}
                  onRename={() => renameItem(item)}
                  onDelete={() => deleteItem(item)}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <FileEditor
          content={selectedNode.content || ""}
          onChange={updateFile}
        />
      )}
    </main>
  );
}