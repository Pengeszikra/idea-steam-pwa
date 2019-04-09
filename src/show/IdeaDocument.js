import React from 'react';
import Markdown from 'react-markdown-renderer';
import useDocument from '../hooks/useDocument';

export default () => {
  const [document] = useDocument('/assets/document/idea.md');
  return <Markdown markdown = {document} />
}