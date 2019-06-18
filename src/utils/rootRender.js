import {render} from 'react-dom';
import postApplicationReady from './postApplicationReady';

const loaderOver = content => {postApplicationReady(); return content; };
export default content => render(loaderOver(content), document.getElementById('root'));