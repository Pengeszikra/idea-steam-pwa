import React from 'react';
import Markdown from 'react-markdown-renderer';
import useDocument from './useDocument';

export default ({url}) => {
  const [document] = useDocument(url);
  return (
    <div className="full-width">
      <Markdown markdown = {document} />
    </div>
  );
}