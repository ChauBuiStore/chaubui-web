import parse, { Element, HTMLReactParserOptions } from "html-react-parser";

export function parseHTML(html: string) {
  if (!html) return null;

  const parseOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const dangerousTags = [
          "script",
          "iframe",
          "object",
          "embed",
          "link",
          "style",
        ];
        if (dangerousTags.includes(domNode.name)) {
          return null;
        }

        if (domNode.attribs) {
          Object.keys(domNode.attribs).forEach((attr) => {
            const attrLower = attr.toLowerCase();
            if (attrLower.startsWith("on")) {
              delete domNode.attribs[attr];
            }
            const value = domNode.attribs[attr];
            if (value && typeof value === "string") {
              if (
                value.toLowerCase().includes("javascript:") ||
                value.toLowerCase().includes("data:text/html")
              ) {
                delete domNode.attribs[attr];
              }
            }
          });
        }
      }
    },
  };

  return parse(html, parseOptions);
}
