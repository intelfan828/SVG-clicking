import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';

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
  const [clickedElement, setClickedElement] = useState<SVGObjectInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

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

  const handleClick = (event: MouseEvent) => {
    try {
      const target = (event.target as SVGElement).closest('path, g');
      if (target && (target instanceof SVGPathElement || target instanceof SVGGElement)) {
        // Find the parent g tag with id pattern g2, g3, etc.
        let parentG = target.closest('g[id^="g"]');
        if (!parentG) {
          // If the clicked element itself is a g tag with the pattern, use it
          if (target instanceof SVGGElement && target.id.match(/^g\d+$/)) {
            parentG = target;
          }
        }

        if (parentG) {
          const elementInfo = getElementInfo(parentG);
          setClickedElement(elementInfo);
          setDebugInfo(`Clicked: ${target.tagName} (ID: ${target.id}), Parent G: ${parentG.id}`);
          setIsModalOpen(true);
          console.log('Clicked object info:', elementInfo);
        }
      }
    } catch (error) {
      console.error('Error handling click:', error);
      setDebugInfo(`Click error: ${error}`);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    try {
      const target = (event.target as SVGElement).closest('path, g');
      if (target && (target instanceof SVGPathElement || target instanceof SVGGElement)) {
        let parentG = target.closest('g[id^="g"]');
        if (!parentG) {
          if (target instanceof SVGGElement && target.id.match(/^g\d+$/)) {
            parentG = target;
          }
        }

        if (parentG) {
          setTooltip({
            text: parentG.id,
            x: event.clientX + 10,
            y: event.clientY + 10
          });
        } else {
          setTooltip(null);
        }
      } else {
        setTooltip(null);
      }
    } catch (error) {
      console.error('Error handling hover:', error);
      setTooltip(null);
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
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
        svgElement.addEventListener('click', handleClick);
        svgElement.addEventListener('mousemove', handleMouseMove);
        svgElement.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    observer.observe(svgContainer, {
      childList: true,
      subtree: true
    });

    const svgElement = svgContainer.querySelector('svg');
    if (svgElement) {
      svgElement.addEventListener('click', handleClick);
      svgElement.addEventListener('mousemove', handleMouseMove);
      svgElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      observer.disconnect();
      const svgElement = svgContainer.querySelector('svg');
      if (svgElement) {
        svgElement.removeEventListener('click', handleClick);
        svgElement.removeEventListener('mousemove', handleMouseMove);
        svgElement.removeEventListener('mouseleave', handleMouseLeave);
      }
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

  return (
    <div>
      <div
        ref={svgRef}
        style={{ width: '100vw', height: '100vh', cursor: isDragging ? 'grab' : 'default' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMoveDrag}
        onMouseUp={handleMouseUp}
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
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '14px',
            pointerEvents: 'none',
            zIndex: 1000
          }}
        >
          {tooltip.text}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={clickedElement}
      />
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
    </div>
  );
};

export default SVGViewer; 