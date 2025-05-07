export const getSelectionCoordinates = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  return {
    x: rect.x + rect.width / 2,
    y: rect.bottom + window.scrollY + 10,
    isEmpty: selection.toString().length === 0,
  };
};

export const insertImage = (editor: HTMLDivElement, url: string) => {
  const imageElement = document.createElement("img");
  imageElement.src = url;
  imageElement.className = "w-full h-auto rounded-lg my-4";
  imageElement.alt = "Uploaded image";

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  range.deleteContents();
  range.insertNode(imageElement);

  // Move cursor after the image
  range.setStartAfter(imageElement);
  range.setEndAfter(imageElement);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const formatText = (command: string) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  try {
    document.execCommand(command, false, undefined);
    // Ensure the range is restored
    selection.removeAllRanges();
    selection.addRange(range);
  } catch (error) {
    console.error(`Error executing ${command}:`, error);
  }
};

export const createHeading = (level: number) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  document.execCommand("formatBlock", false, `h${level}`);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const createQuote = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  document.execCommand("formatBlock", false, "blockquote");
  selection.removeAllRanges();
  selection.addRange(range);
};

export const createCodeBlock = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  document.execCommand("formatBlock", false, "pre");
  selection.removeAllRanges();
  selection.addRange(range);
};

export const clearFormatting = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  document.execCommand("removeFormat", false);
  selection.removeAllRanges();
  selection.addRange(range);
};

// Basic HTML to Markdown converter
export const htmlToMarkdown = (html: string): string => {
  // Create a temporary DOM element to parse HTML
  const div = document.createElement("div");
  div.innerHTML = html;

  // Recursive function to convert DOM nodes to Markdown
  const convertNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }

    const element = node as HTMLElement;
    let content = Array.from(element.childNodes).map(convertNode).join("");

    switch (element.tagName.toLowerCase()) {
      case "strong":
      case "b":
        return `**${content}**`;
      case "em":
      case "i":
        return `*${content}*`;
      case "h1":
        return `# ${content}\n\n`;
      case "h2":
        return `## ${content}\n\n`;
      case "blockquote":
        return (
          content
            .split("\n")
            .map((line) => `> ${line}`)
            .join("\n") + "\n\n"
        );
      case "pre":
        return "```\n" + content + "\n```\n\n";
      case "ul":
        return (
          content
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => `- ${line.trim()}`)
            .join("\n") + "\n\n"
        );
      case "ol":
        return (
          content
            .split("\n")
            .filter((line) => line.trim())
            .map((line, index) => `${index + 1}. ${line.trim()}`)
            .join("\n") + "\n\n"
        );
      case "img":
        const src = element.getAttribute("src") || "";
        const alt = element.getAttribute("alt") || "Image";
        return `![${alt}](${src})\n\n`;
      case "br":
        return "\n";
      case "div":
      case "p":
        return content + "\n\n";
      default:
        return content;
    }
  };

  let markdown = Array.from(div.childNodes).map(convertNode).join("").trim();
  // Clean up extra newlines
  markdown = markdown.replace(/\n{3,}/g, "\n\n");
  return markdown;
};
