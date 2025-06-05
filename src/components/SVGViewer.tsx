import React, { useState } from 'react';
import { blockData, connectData } from './Data';

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
      const elementId = clickedElement.id;
      // Find the parent g tag with id starting with 'g'
      const parentG = clickedElement.closest('g[id^="g"]');
      
      if (parentG) {
        const gId = parentG.id;
        // Check if the clicked element is in blockData
        const block = blockData.find(block => block.id === gId);
        if (block) {
          setSelectedBlock(block);
        }
      }
    }
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      display: 'flex',
      backgroundColor: 'gray',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <div style={{
        width: '75vw',
        height: '95vh',
        border: '1px solid #444444',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: '10px',
        margin: '2.5vh'
      }}>
        {svgContent && (
          <div 
            style={{
              width: '100%',
              height: '100%',
              overflow: 'auto'
            }}
            onClick={handleSVGClick}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        )}
      </div>
      
      {/* Right Panel */}
      <div style={{
        width: '20vw',
        height: '95vh',
        border: '1px solid #444444',
        backgroundColor: 'white',
        borderRadius: '10px',
        margin: '2.5vh 2.5vh 2.5vh 0',
        padding: '20px',
        overflow: 'auto',
        color: 'black'
      }}>
        {selectedBlock ? (
          <div>
            <h2>{selectedBlock.data.name}</h2>
            <p>{selectedBlock.data.description}</p>
            <h3>Q&A</h3>
            {selectedBlock.data.qa.map((item, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <p><strong>Q: {item.question}</strong></p>
                <p>A: {item.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Click on a block to view its details</p>
        )}
      </div>
    </div>
  );
};

export default SVGViewer; 