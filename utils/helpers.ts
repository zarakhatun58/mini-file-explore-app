import { FSNode } from "../types";


export const uid = () =>
  Math.random().toString(36).slice(2, 9);

export function findNode(
  node: FSNode,
  id: string
): FSNode | null {
  if (node.id === id) return node;

  if (!node.children) return null;

  for (const child of node.children) {
    const found = findNode(child, id);

    if (found) return found;
  }

  return null;
}

export function addNode(
  tree: FSNode,
  parentId: string,
  node: FSNode
): FSNode {
  if (tree.id === parentId) {
    return {
      ...tree,
      children: [...(tree.children || []), node],
    };
  }

  return {
    ...tree,
    children: tree.children?.map((c) =>
      addNode(c, parentId, node)
    ),
  };
}

export function renameNode(
  tree: FSNode,
  id: string,
  name: string
): FSNode {
  if (tree.id === id) {
    return {
      ...tree,
      name,
    };
  }

  return {
    ...tree,
    children: tree.children?.map((c) =>
      renameNode(c, id, name)
    ),
  };
}

export function deleteNode(
  tree: FSNode,
  id: string
): FSNode {
  return {
    ...tree,
    children: tree.children
      ?.filter((c) => c.id !== id)
      .map((c) => deleteNode(c, id)),
  };
}

export function updateContent(
  tree: FSNode,
  id: string,
  content: string
): FSNode {
  if (tree.id === id) {
    return {
      ...tree,
      content,
    };
  }

  return {
    ...tree,
    children: tree.children?.map((c) =>
      updateContent(c, id, content)
    ),
  };
}