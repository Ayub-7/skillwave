import React from 'react';
import { FileText } from 'lucide-react';
import Link from 'next/link';

interface PDFDisplayProps {
    pdfUrl: string;
    sectionTitle?: string;
}

const PDFDisplay: React.FC<PDFDisplayProps> = ({ pdfUrl, sectionTitle }) => {
    return (
        <div className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <FileText className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {sectionTitle ? `${sectionTitle} - ` : ''}PDF Resource
                    </h3>
                </div>
            </div>
            <Link
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
            >
                View PDF
            </Link>
        </div>
    );
};

export default PDFDisplay;