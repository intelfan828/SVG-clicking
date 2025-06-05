import React, { useState } from 'react';
import { blockData } from '../Data/blockData';
import { contactData } from '../Data/contactData';
import type { AnswerSegment, BlockData } from '../Data/blockData';
import './SVGViewer.css';

interface SVGViewerProps {
  svgContent?: string;
}

type TabType = 'main' | 'contact';

const SVGViewer: React.FC<SVGViewerProps> = ({ svgContent }) => {
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);
  const [currentQAIndex, setCurrentQAIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('main');

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

  const renderAnswer = (answer: AnswerSegment[]) => {
    return answer.map((segment, index) => {
      switch (segment.type) {
        case 'text':
        case 'bold':
          return <span key={index} style={{ fontWeight: segment.type === 'bold' ? 'bold' : 'normal' }}>{segment.content}</span>;
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
            <div className="tabs">
              <button 
                className={`tab-button ${activeTab === 'main' ? 'active' : ''}`}
                onClick={() => setActiveTab('main')}
              >
                Main
              </button>
              <button 
                className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact
              </button>
            </div>
            
            {activeTab === 'main' ? (
              <div className="tab-content">
                <h2 className="block-title">{selectedBlock.data.name}</h2>
                <p className="block-description">{selectedBlock.data.description}</p>
                <div className="qa-section">
                  <h3 className="qa-title">Q&A</h3>
                  {selectedBlock.data.qa.length > 0 && (
                    <>
                      <div className="qa-navigation">
                        <button 
                          className="qa-nav-button"
                          onClick={handlePrevQA}
                          disabled={currentQAIndex === 0}
                        >
                          Previous
                        </button>
                        <span className="qa-counter">
                          {currentQAIndex + 1} / {selectedBlock.data.qa.length}
                        </span>
                        <button 
                          className="qa-nav-button"
                          onClick={handleNextQA}
                          disabled={currentQAIndex === selectedBlock.data.qa.length - 1}
                        >
                          Next
                        </button>
                      </div>
                      <div className="qa-item">
                        <div className="question">
                          <strong>Question:</strong>
                          <p>{selectedBlock.data.qa[currentQAIndex].question}</p>
                        </div>
                        <div className="answer">
                          <strong>Answer:</strong>
                          <p>{renderAnswer(selectedBlock.data.qa[currentQAIndex].answer)}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="tab-content">
                <h2 className="block-title">Contact Information</h2>
                <div className="contact-section">
                  <div className="team-section">
                    <h3>Our Team</h3>
                    <img 
                      src={contactData[0].image} 
                      alt="Team" 
                      className="team-image"
                    />
                  </div>
                  <div className="contact-info-section">
                    <h3>Contact Us</h3>
                    <p className="contact-info">
                      {contactData[0].info}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="placeholder">Click on a block to view its details</p>
        )}
      </div>
    </div>
  );
};

export default SVGViewer; 