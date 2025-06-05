import React from 'react';

interface SVGViewerProps {
  svgContent?: string;
}

const SVGViewer: React.FC<SVGViewerProps> = ({ svgContent }) => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {svgContent && (
        <div 
          dangerouslySetInnerHTML={{ __html: svgContent }} 
        />
      )}
    </div>
  );
};

export default SVGViewer; 