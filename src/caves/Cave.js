import React from 'react'
import MarkdownReader from '../show/MarkdownReader';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default ({url}) => (
    <div className="markdownFrame">
        <MarkdownReader url={url} />
    </div>
)