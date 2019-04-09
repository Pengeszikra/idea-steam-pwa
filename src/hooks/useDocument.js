import { useEffect, useState } from "react";

export default function(documentUrl) {
  const [doc, readDoc] = useState("");

  useEffect(() => {
    fetch(documentUrl)
      .then(result => result.text())
      .then(text => readDoc(text));
    return () => null;
  }, []);

  return [doc, readDoc];
}
