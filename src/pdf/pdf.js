import React from 'react';
import ReactPDF from '@react-pdf/renderer';

import PdfResume from './PdfResume.react.js';

ReactPDF.render(<PdfResume />, `${__dirname}/../resume.pdf`);
