import React, { useEffect, useRef, useState } from 'react';
import { blockData, connectData } from './Data';

interface SVGObjectInfo {
  id: string;
  tagName: string;
  className: string;
  attributes: { [key: string]: string };
  path?: string;
  children?: SVGObjectInfo[];
}

interface SVGViewerProps {
  svgContent?: string;
}

const SVGViewer: React.FC<SVGViewerProps> = ({ svgContent }) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [selectedData, setSelectedData] = useState<any>(null);

  const getElementInfo = (element: Element): SVGObjectInfo => {
    const attributes: { [key: string]: string } = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      attributes[attr.name] = attr.value;
    }

    const info: SVGObjectInfo = {
      id: element.id || '',
      tagName: element.tagName.toLowerCase(),
      className: element.className.toString(),
      attributes,
    };

    if (element instanceof SVGPathElement) {
      info.path = element.getAttribute('d') || undefined;
    }

    if (element.children.length > 0) {
      info.children = Array.from(element.children).map(child => getElementInfo(child));
    }

    return info;
  };

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 2)); // Max scale 2
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.1)); // Min scale 0.1
  };

  useEffect(() => {
    const svgContainer = svgRef.current;
    if (!svgContainer) return;

    const observer = new MutationObserver(() => {
      const svgElement = svgContainer.querySelector('svg');
      if (svgElement) {
        // SVG element is ready
      }
    });

    observer.observe(svgContainer, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, [svgContent]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
        if (event.deltaY < 0) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setIsDragging(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setIsDragging(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (isDragging) {
      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseMoveDrag = (event: React.MouseEvent) => {
    if (isDragging && dragStart) {
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;
      const svgElement = svgRef.current?.querySelector('svg');
      if (svgElement) {
        svgElement.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      }
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (isDragging) return; // Don't handle clicks while dragging

    const target = event.target as Element;
    console.log('Clicked element:', target);
    console.log('Clicked element ID:', target.id);
    console.log('Clicked element tag:', target.tagName);

    let currentElement: Element | null = target;

    // Find the parent g tag
    while (currentElement && currentElement.tagName.toLowerCase() !== 'g') {
      currentElement = currentElement.parentElement;
      console.log('Parent element:', currentElement);
      if (currentElement) {
        console.log('Parent ID:', currentElement.id);
        console.log('Parent tag:', currentElement.tagName);
      }
    }

    if (currentElement) {
      const id = currentElement.id;
      console.log('Found g tag with ID:', id);
      
      // Check blockData
      const block = blockData.find(item => item.id === id);
      console.log('Found in blockData:', block);
      if (block) {
        setSelectedData(block.data);
        return;
      }

      // Check connectData
      const connect = connectData.find(item => item.id === id);
      console.log('Found in connectData:', connect);
      if (connect) {
        setSelectedData(connect.data);
        return;
      }

      // If no data found, clear selection
      setSelectedData(null);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div
        ref={svgRef}
        style={{ width: '70vw', height: '100vh', cursor: isDragging ? 'grab' : 'default' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMoveDrag}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
      >
        {svgContent && (
          <div 
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'top left'
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        )}
      </div>
      
      {/* Right side panel */}
      <div style={{ width: '30vw', padding: '20px', borderLeft: '1px solid #ccc' }}>
        <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
          <button onClick={handleZoomIn}>Zoom In</button>
          <button onClick={handleZoomOut}>Zoom Out</button>
        </div>
        
        {selectedData && (
          <div>
            <h2>{selectedData.name}</h2>
            <p>{selectedData.description}</p>
            {selectedData.qa && (
              <div>
                {selectedData.qa.map((item: any, index: number) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SVGViewer; 