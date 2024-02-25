import { nanoid } from "nanoid";
import { Page } from "./types";
export const createPage = (): Page => {
  const slug = nanoid();
  const id = nanoid();
  const page = {
    title: "Untitled",
    id,
    slug,
    nodes: [],
    cover: "",
  };
  return page;
};
