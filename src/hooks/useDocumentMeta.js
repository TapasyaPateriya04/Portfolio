import { useEffect } from "react";

const DEFAULT_TITLE = "Tapasya Pateriya · Full-stack developer (Java + React)";

export function useDocumentMeta(title, description) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content");
    document.title = title ? `${title} · Tapasya Pateriya` : DEFAULT_TITLE;
    if (meta && description) meta.setAttribute("content", description);
    return () => {
      document.title = DEFAULT_TITLE;
      if (meta && prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
