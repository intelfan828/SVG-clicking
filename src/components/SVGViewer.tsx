import React, { useState } from 'react';
import { blockData, connectData } from './Data';
import './SVGViewer.css';

interface SVGViewerProps {
  svgContent?: string;
}

interface BlockData {
  id: string;
  lines: string[];
  data: {
    name: string;
    description: string;
    qa: Array<{
      question: string;
      answer: string;
    }>;
  };
}

const SVGViewer: React.FC<SVGViewerProps> = ({ svgContent }) => {
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);

  const handleSVGClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const clickedElement = target.closest('g, path');
    
    if (clickedElement) {
      const parentG = clickedElement.closest('g[id^="g"]');
      
      if (parentG) {
        const gId = parentG.id;
        const block = blockData.find(block => block.id === gId);
        if (block) {
          setSelectedBlock(block);
        }
      }
    }
  };

  return (
    <div className="svg-viewer-container">
      <div className="svg-viewer-content">
        {svgContent && (
          <div 
            className="svg-container"
            onClick={handleSVGClick}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        )}
      </div>
      
      <div className="details-panel">
        {selectedBlock ? (
          <div>
            <h2 className="block-title">{selectedBlock.data.name}</h2>
            <p className="block-description">{selectedBlock.data.description}</p>
            <div className="qa-section">
              <h3 className="qa-title">Q&A</h3>
              {selectedBlock.data.qa.map((item, index) => (
                <div key={index} className="qa-item">
                  <p className="question">Q: {item.question}</p>
                  <p className="answer">A: {item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="placeholder">Click on a block to view its details</p>
        )}
      </div>
    </div>
  );
};

export default SVGViewer; 