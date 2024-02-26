import { useState } from "react";

import { arrayMove } from "@dnd-kit/sortable";

import { Page, NodeData, NodeType } from "../utils/types";

export const usePageState = (initialState: Page) => {
  const [page, setPage] = useState<Page>(initialState);

  // extract similar logic to `updateNode` function
  const updateNode = (cb: (nodes: NodeData[]) => void) => {
    const newNodes = [...page.nodes];
    cb(newNodes); // mutating logic here
    setPage({ ...page, nodes: newNodes });
  };

  const addNode = (node: NodeData, index: number) => {
    // adding new node after the given index
    updateNode((nodes) => nodes.splice(index, 0, node));
  };

  const removeNodeByIndex = (index: number) => {
    updateNode((nodes) => nodes.splice(index, 1));
  };

  const changeNodeValue = (index: number, value: string) => {
    updateNode((nodes) => (nodes[index].value = value));
  };

  const changeNodeType = (index: number, type: NodeType) => {
    updateNode((nodes) => {
      nodes[index].type = type;
      nodes[index].value = ""; // reset value when changing type
    });
  };

  const setNodes = (nodes: NodeData[]) => {
    setPage({ ...page, nodes });
  };

  const setTitle = (title: string) => {
    setPage({ ...page, title });
  };
  const setCoverImage = (cover: string) => {
    setPage({ ...page, cover });
  };

  // reorder nodes with DnD
  const reorderNodes = (activeId: string, overId: string) => {
    const oldId = page.nodes.findIndex((node) => node.id === activeId);
    const newId = page.nodes.findIndex((node) => node.id === overId);
    const newNodes = arrayMove(page.nodes, oldId, newId);
    setPage({ ...page, nodes: newNodes });
  };

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    changeNodeType,
    changeNodeValue,
    addNode,
    removeNodeByIndex,
    setCoverImage,
    setTitle,
    setNodes,
    reorderNodes,
  };
};
