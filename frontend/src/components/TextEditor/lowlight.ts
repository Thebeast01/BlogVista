// import { createLowlight } from 'lowlight';
import { all, createLowlight } from 'lowlight'
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml'; // `xml` is used for HTML in highlight.js

const lowlight = createLowlight(all);

// Register languages with standard names expected by highlight.js
lowlight.register('javascript', javascript);
lowlight.register('typescript', typescript);
lowlight.register('css', css);
lowlight.register('html', xml); // Use 'html' as the alias for clarity

export default lowlight;