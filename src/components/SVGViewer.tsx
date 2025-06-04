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

  useEffect(() => {
    const svgContainer = svgRef.current;
    if (!svgContainer) return;

    const observer = new MutationObserver(() => {
      const svgElement = svgContainer.querySelector('svg');
      if (svgElement) {
        svgElement.addEventListener('click', handleClick);
      }
    });

    observer.observe(svgContainer, {
      childList: true,
      subtree: true
    });

    const svgElement = svgContainer.querySelector('svg');
    if (svgElement) {
      svgElement.addEventListener('click', handleClick);
    }

    return () => {
      observer.disconnect();
      const svgElement = svgContainer.querySelector('svg');
      if (svgElement) {
        svgElement.removeEventListener('click', handleClick);
      }
    };
  }, [svgContent]);

  return (
    <div>
      <div ref={svgRef} style={{ width: '100%', height: '100%' }}>
        {svgContent && (
          <div 
            style={{ 
              transform: 'scale(0.5)',
              transformOrigin: 'top left'
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={clickedElement}
      />
    </div>
  );
};

export default SVGViewer; 