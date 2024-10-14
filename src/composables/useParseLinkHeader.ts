import { ref } from "vue";

interface navigationObject {
  url: string;
  rel: string;
}

export function useParseLinkHeader() {
  const parseLinkHeader = (linkHeader: string): navigationObject[] => {
    const links = linkHeader.split(", ");

    return links.map((link) => {
      const [urlPart, relPart] = link.split("; ");
      const urlinit = urlPart.slice(1, -1);
      const [root, query] = urlinit.split("?");

      const url = "?" + query;
      const rel = relPart.slice(5, -1);

      return { url, rel };
    });
  };

  const navigationObjects = ref<navigationObject[] | null>([]);

  const parseLinks = (linkHeader: string) => {
    navigationObjects.value = parseLinkHeader(linkHeader);
  };

  return {
    navigationObjects,
    parseLinks,
  };
}
