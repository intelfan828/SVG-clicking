import React, { useState } from 'react';
import { blockData } from './Data';
import type { AnswerSegment, BlockData } from './Data';
import './SVGViewer.css';

interface SVGViewerProps {
  svgContent?: string;
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
        } else {
          setSelectedBlock(null);
        }
      }
    }
  };

  const renderAnswer = (answer: AnswerSegment[]) => {
    return answer.map((segment, index) => {
      switch (segment.type) {
        case 'text':
          return <span key={index}>{segment.content}</span>;
        case 'bold':
          return <strong key={index}>{segment.content}</strong>;
        case 'break':
          return <br key={index} />;
        default:
          return null;
      }
    });
  };

  return (
    <div className="svg-viewer-container">
      <div className={`svg-viewer-content ${selectedBlock ? 'with-panel' : ''}`}>
        {svgContent && (
          <div 
            className="svg-container"
            onClick={handleSVGClick}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        )}
      </div>
      
      <div className={`details-panel ${selectedBlock ? 'expanded' : ''}`}>
        {selectedBlock ? (
          <div>
            <h2 className="block-title">{selectedBlock.data.name}</h2>
            <p className="block-description">{selectedBlock.data.description}</p>
            <div className="qa-section">
              <h3 className="qa-title">Q&A</h3>
              {selectedBlock.data.qa.map((item, index) => (
                <div key={index} className="qa-item">
                  <div className="question">
                    <strong>Question:</strong>
                    <p>{item.question}</p>
                  </div>
                  <div className="answer">
                    <strong>Answer:</strong>
                    <p>{renderAnswer(item.answer)}</p>
                  </div>
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