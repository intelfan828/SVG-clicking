import React, { useState, useEffect } from 'react';
import { blockData } from '../Data/blockData';
import type { BlockData } from '../Data/blockData';
import RightSidePanel from './RightSidePanel';
import './SVGViewer.css';

interface SVGViewerProps {
  svgContent?: string;
}

type TabType = 'main' | 'contact';

const SVGViewer: React.FC<SVGViewerProps> = ({ svgContent }) => {
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);
  const [currentQAIndex, setCurrentQAIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('main');
  const [highlightedLines, setHighlightedLines] = useState<string[]>([]);

  // Update highlighted lines when selected block changes
  useEffect(() => {
    if (selectedBlock) {
      setHighlightedLines(selectedBlock.lines);
    } else {
      setHighlightedLines([]);
    }
  }, [selectedBlock]);

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
          setCurrentQAIndex(0); // Reset Q&A index when selecting a new block
        } else {
          setSelectedBlock(null);
        }
      }
    }
  };

  // Add styles for highlighted lines
  const svgStyle = `
    ${highlightedLines.map(lineId => `
      #${lineId} {
        stroke-width: 3px !important;
        stroke: #ff0000 !important;
        filter: drop-shadow(0 0 2px rgba(255, 0, 0, 0.5));
      }
    `).join('')}
  `;

  const handlePrevQA = () => {
    if (selectedBlock && currentQAIndex > 0) {
      setCurrentQAIndex(currentQAIndex - 1);
    }
  };

  const handleNextQA = () => {
    if (selectedBlock && currentQAIndex < selectedBlock.data.qa.length - 1) {
      setCurrentQAIndex(currentQAIndex + 1);
    }
  };

  return (
    <div className="svg-viewer-container">
      <div className={`svg-viewer-content ${selectedBlock ? 'with-panel' : ''}`}>
        {svgContent && (
          <>
            <style>{svgStyle}</style>
            <div 
              className="svg-container"
              onClick={handleSVGClick}
              dangerouslySetInnerHTML={{ __html: svgContent }} 
            />
          </>
        )}
      </div>
      
      <RightSidePanel
        selectedBlock={selectedBlock}
        currentQAIndex={currentQAIndex}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPrevQA={handlePrevQA}
        onNextQA={handleNextQA}
      />
    </div>
  );
};

export default SVGViewer; 