"use client";

import {
  FileText,
  Folder,
  Pencil,
  Trash2,
} from "lucide-react";
import { FSNode } from "../types";



interface Props {
  item: FSNode;
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export default function FileCard({
  item,
  onOpen,
  onRename,
  onDelete,
}: Props) {
  return (
    <div className="border rounded-2xl bg-white p-8 flex flex-col items-center hover:shadow-md">
      <button
        onClick={onOpen}
        className="flex flex-col items-center"
      >
        {item.type === "folder" ? (
          <Folder className="w-16 h-16 text-yellow-500" />
        ) : (
          <FileText className="w-16 h-16 text-gray-500" />
        )}

        <h3 className="text-xl font-semibold mt-4">
          {item.name}
        </h3>
      </button>

      <div className="flex gap-4 mt-5">
        <button
          onClick={onRename}
          className="text-sm flex items-center gap-1 text-gray-600"
        >
          <Pencil size={14} />
          Rename
        </button>

        <button
          onClick={onDelete}
          className="text-sm flex items-center gap-1 text-red-600"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}