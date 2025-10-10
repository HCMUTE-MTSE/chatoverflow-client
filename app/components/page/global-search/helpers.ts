interface TextNode {
  type?: string;
  text?: string;
  content?: ContentNode[];
}

interface ContentNode {
  type?: string;
  text?: string;
  content?: ContentNode[];
}

export const extractText = (jsonData: string | TextNode): string => {
  let parsedData: TextNode;

  if (typeof jsonData === 'string') {
    parsedData = JSON.parse(jsonData);
  } else {
    parsedData = jsonData;
  }

  let text = '';

  const traverse = (node: ContentNode): void => {
    if (node.text) {
      text += node.text;
    }
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  };

  traverse(parsedData);
  return text;
};
