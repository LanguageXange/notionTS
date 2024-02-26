import { nanoid } from "nanoid";
import { Page } from "./types";
import { supabase } from "./supabase-client";
import { debounce } from "./debounce";
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

// page id should never change and we can make other fields optional with Partial
export const updatePage = debounce(
  async (page: Partial<Page> & Pick<Page, "id">) => {
    await supabase.from("pages").update(page).eq("id", page.id);
  },
  500
);
