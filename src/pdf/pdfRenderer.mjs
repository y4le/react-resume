/*
 * Supply PdfResume with informaiton to display and render it to a file.
 */

import React from 'react';
import ReactPDF from '@react-pdf/renderer';

import PdfResume from './PdfResume';
import content from '../js/content';

ReactPDF.render(<PdfResume content={content} />, `${__dirname}/resume.pdf`);
