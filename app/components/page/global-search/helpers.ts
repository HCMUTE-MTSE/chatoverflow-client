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
  let parsedData: TextNode | null = null;

  if (typeof jsonData === 'string') {
    const trimmed = jsonData.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        parsedData = JSON.parse(trimmed);
      } catch (err) {
        return stripHtmlTags(jsonData);
      }
    } else {
      return stripHtmlTags(jsonData);
    }
  } else {
    parsedData = jsonData;
  }

  if (!parsedData) return '';

  let text = '';

  const traverse = (node: ContentNode): void => {
    if (node.text) text += node.text;
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  };

  traverse(parsedData);
  return text;
};

const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '').trim();
};
