"use client";

import { useEffect, useMemo, useState } from "react";

import { FileText, Menu, X } from "lucide-react";

import Sidebar from "../components/Sidebar";
import MainPanel from "../components/MainPanel";

import { FSNode, NodeType } from "../types";

import {
  addNode,
  deleteNode,
  findNode,
  renameNode,
  uid,
  updateContent,
} from "../utils/helpers";

const initialTree: FSNode = {
  id: "root",
  name: "My Drive",
  type: "folder",
  children: [
    {
      id: uid(),
      name: "Documents",
      type: "folder",
      children: [
        {
          id: uid(),
          name: "readme.txt",
          type: "file",
          content: "Welcome to Mini File Explorer",
        },
      ],
    },
    {
      id: uid(),
      name: "Projects",
      type: "folder",
      children: [
        {
          id: uid(),
          name: "todo.txt",
          type: "file",
          content: "Finish project",
        },
      ],
    },
  ],
};

export default function Home() {
  const [tree, setTree] =
    useState<FSNode>(initialTree);

  const [selectedId, setSelectedId] =
    useState("root");

  const [expanded, setExpanded] = useState<
    Record<string, boolean>
  >({
    root: true,
  });

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(
      "file-explorer"
    );

    if (saved) {
      setTree(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "file-explorer",
      JSON.stringify(tree)
    );
  }, [tree]);

  const selectedNode = useMemo(() => {
    return findNode(tree, selectedId) || tree;
  }, [tree, selectedId]);

  const toggleFolder = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const createItem = (type: NodeType) => {
    if (selectedNode.type !== "folder") return;

    const name = prompt(
      `Enter ${type} name`
    );

    if (!name?.trim()) return;

    const newNode: FSNode =
      type === "folder"
        ? {
            id: uid(),
            name,
            type: "folder",
            children: [],
          }
        : {
            id: uid(),
            name,
            type: "file",
            content: "",
          };

    setTree((prev) =>
      addNode(prev, selectedNode.id, newNode)
    );

    setExpanded((prev) => ({
      ...prev,
      [selectedNode.id]: true,
    }));
  };

  const renameItem = (node: FSNode) => {
    const name = prompt(
      "Rename item",
      node.name
    );

    if (!name?.trim()) return;

    setTree((prev) =>
      renameNode(prev, node.id, name)
    );
  };

  const deleteItem = (node: FSNode) => {
    if (node.id === "root") {
      alert("Root folder cannot be deleted");
      return;
    }

    if (!confirm(`Delete ${node.name}?`))
      return;

    setTree((prev) =>
      deleteNode(prev, node.id)
    );
  };

  const updateFile = (value: string) => {
    setTree((prev) =>
      updateContent(
        prev,
        selectedNode.id,
        value
      )
    );
  };

  return (
    <div className="h-screen p-2 bg-[#f5f5f5]">
      <div className="h-full bg-white rounded-2xl border overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <FileText size={30} />

            <h1 className="text-2xl font-bold">
              Mini File Explorer
            </h1>
          </div>

          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="md:hidden"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        <div className="flex h-[calc(100%-64px)]">
          <Sidebar
            tree={tree}
            selectedId={selectedId}
            expanded={expanded}
            onSelect={(id) => {
              setSelectedId(id);
              setSidebarOpen(false);
            }}
            toggleFolder={toggleFolder}
            sidebarOpen={sidebarOpen}
          />

          <MainPanel
            selectedNode={selectedNode}
            createItem={createItem}
            renameItem={renameItem}
            deleteItem={deleteItem}
            openItem={setSelectedId}
            updateFile={updateFile}
          />
        </div>
      </div>
    </div>
  );
}