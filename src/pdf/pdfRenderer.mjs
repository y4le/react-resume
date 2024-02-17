/*
 * Supply PdfResume with informaiton to display and render it to a file.
 */

import React from 'react'
import ReactPDF from '@react-pdf/renderer'
import path from 'path'

import PdfResume from './PdfResume'
import content from '../resume-content/dist/data.json'

ReactPDF.render(<PdfResume content={content} />, path.join(__dirname, 'resume.pdf'))
