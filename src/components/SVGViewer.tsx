import React from 'react';

interface SVGViewerProps {
  svgContent?: string;
}

const SVGViewer: React.FC<SVGViewerProps> = ({ svgContent }) => {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <div style={{
        width: '95vw',
        height: '95vh',
        border: '1px solid #444444',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: '10px'
      }}>
        {svgContent && (
          <div 
            style={{
              width: '100%',
              height: '100%',
              overflow: 'auto'
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        )}
      </div>
    </div>
  );
};

export default SVGViewer; 