import { NodeData } from "../utils/types";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateProvider";
import { supabase } from "../utils/supabase-client";

type PageNodeProps = {
  node: NodeData;
  isFocused: boolean;
  index: number;
};

export const PageNode = ({ node, isFocused, index }: PageNodeProps) => {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState("untitled page");
  const { removeNodeByIndex } = useAppState();

  console.log(node, "what is node in PageNode");
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "Backspace") {
        removeNodeByIndex(index);
      }
      if (event.key === "Enter") {
        navigate(`/${node.value}`);
      }
    };
    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, removeNodeByIndex, index, navigate, node]);

  useEffect(() => {
    const fetchPageTitle = async () => {
        // we need to create another table to store 'page' perhaps?
      const { data } = await supabase
        .from("page")
        .select("title")
        .eq("slug", node.value)
        .single();
    
        console.log(data,'what is data')
      setPageTitle(data?.title);
    };
    if (node.type === "page" && node.value) {
      fetchPageTitle();
    }
  }, [node.type, node.value]);

  // node.value is "" when you created the page for the first time
  // To Fix - we need a way to actually create a new page with blank state
  const navigateToPage = () => {
    navigate(`/${node.id}`);
  }

  return (
    <div onClick={navigateToPage} className="bg-blue-300">
      📄 {pageTitle}
    </div>
  );
};
