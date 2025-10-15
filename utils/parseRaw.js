export const extractData = (rawText) => {
  try {
    const match = rawText.match(
      /dwr\.engine\._remoteHandleCallback\('4','0',([\s\S]*)\);/
    );

    if (!match) return null;

    const jsonString = match[1];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Parse error:", error);
    return null;
  }
};
