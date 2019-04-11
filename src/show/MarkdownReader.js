import React from 'react';
import Markdown from 'react-markdown-renderer';
import useDocument from '../hooks/useDocument';

export default ({url}) => {
  const [document] = useDocument(url);
  return <Markdown markdown = {document} />
}