import React from 'react'
import MarkdownReader from '../show/MarkdownReader';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default ({url}) => (
    <main>
        <Router>
            <Link className="link" to="/done">Feladat megoldva</Link>
            <Link className="link" to="/slave">Ember kiszabaditva</Link>
            <Link className="link" to="/found">Tárgy megtalálva</Link>
            <MarkdownReader url={url} />
        </Router>
    </main>
)