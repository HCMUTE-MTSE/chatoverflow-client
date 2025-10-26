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

  // Check if it's already an object
  if (typeof jsonData === 'object' && jsonData !== null) {
    parsedData = jsonData;
  } else if (typeof jsonData === 'string') {
    const trimmed = jsonData.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        parsedData = JSON.parse(trimmed);
      } catch (err) {
        // If JSON parsing fails, try to extract text using regex
        const textMatches = trimmed.matchAll(
          /"text":"([^"\\]*(?:\\.[^"\\]*)*)"/g
        );
        let extractedText = '';
        for (const match of textMatches) {
          if (match[1]) {
            // Unescape the JSON string
            extractedText +=
              match[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\') + ' ';
          }
        }
        return extractedText.trim() || stripHtmlTags(jsonData);
      }
    } else {
      return stripHtmlTags(jsonData);
    }
  }

  if (!parsedData) return '';

  let text = '';
  const traverse = (node: any): void => {
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
