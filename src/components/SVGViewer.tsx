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
        const elementInfo = getElementInfo(target);
        setClickedElement(elementInfo);
        setDebugInfo(`Clicked: ${target.tagName} (ID: ${target.id})`);
        setIsModalOpen(true);
        console.log('Clicked object info:', elementInfo);
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
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        )}
      </div>
      <div style={{ 
        padding: '10px', 
        background: '#f0f0f0', 
        maxHeight: '200px', 
        overflow: 'auto',
        borderTop: '1px solid #ccc'
      }}>
        <div style={{ color: 'black', marginBottom: '10px', padding: '5px', background: '#fff', border: '1px solid #ddd' }}>
          <strong>Debug Info:</strong> {debugInfo}
        </div>
        {clickedElement && (
          <div style={{ color: 'black' }}>
            <h3>Clicked Object:</h3>
            <pre>{JSON.stringify(clickedElement, null, 2)}</pre>
          </div>
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