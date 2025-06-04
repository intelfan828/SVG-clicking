import { useEffect, useState, useRef } from 'react';

interface SVGObjectInfo {
  id: string;
  tagName: string;
  className: string;
  attributes: { [key: string]: string };
  path?: string;
  children?: SVGObjectInfo[];
}

export default function App() {
  const [svgContent, setSvgContent] = useState<string>('');
  const [clickedObject, setClickedObject] = useState<SVGObjectInfo | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    fetch('/SVG222.svg')
      .then(response => response.text())
      .then(svgText => {
        const modifiedSvg = svgText.replace(
          /<svg([^>]*)>/,
          (match, attributes) => {
            if (!attributes.includes('viewBox') && !attributes.includes('preserveAspectRatio')) {
              return `<svg${attributes} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">`;
            }
            return match;
          }
        );
        setSvgContent(modifiedSvg);
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }, []);

  const getElementInfo = (element: SVGElement): SVGObjectInfo => {
    const attributes: { [key: string]: string } = {};
    for (const attr of element.attributes) {
      attributes[attr.name] = attr.value;
    }

    const info: SVGObjectInfo = {
      id: element.id,
      tagName: element.tagName,
      className: element.className.baseVal,
      attributes,
    };

    if (element instanceof SVGPathElement) {
      info.path = element.getAttribute('d') || '';
    }

    if (element instanceof SVGGElement) {
      info.children = Array.from(element.children).map(child => 
        getElementInfo(child as SVGElement)
      );
    }

    return info;
  };

  useEffect(() => {
    if (!svgContent) return;

    const handleClick = (event: MouseEvent) => {
      try {
        const target = (event.target as SVGElement).closest('path, g');
        if (target && (target instanceof SVGPathElement || target instanceof SVGGElement)) {
          const info = getElementInfo(target);
          setClickedObject(info);
          setDebugInfo(`Clicked: ${target.tagName} (ID: ${target.id})`);
          console.log('Clicked object info:', info);
        }
      } catch (error) {
        console.error('Error handling click:', error);
        setDebugInfo(`Click error: ${error}`);
      }
    };

    // Function to set up click handlers
    const setupClickHandlers = () => {
      // Remove any existing click handlers
      const existingSvgs = document.querySelectorAll('svg');
      existingSvgs.forEach(svg => {
        svg.removeEventListener('click', handleClick);
      });

      // Add click handlers to all SVG elements
      const svgElements = document.querySelectorAll('svg');
      console.log('Found SVG elements:', svgElements.length);

      svgElements.forEach((svgElement, index) => {
        // Enable pointer events on all elements
        const allElements = svgElement.querySelectorAll('*');
        allElements.forEach(el => {
          if (el instanceof SVGElement) {
            el.style.pointerEvents = 'auto';
          }
        });

        svgElement.addEventListener('click', handleClick, { passive: true });
        console.log(`Click handler added to SVG ${index}`);
      });
    };

    // Initial setup
    setupClickHandlers();

    // Set up a MutationObserver to watch for SVG changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          setupClickHandlers();
        }
      });
    });

    // Start observing the document body for SVG changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup function
    return () => {
      observer.disconnect();
      const svgElements = document.querySelectorAll('svg');
      svgElements.forEach(svg => {
        svg.removeEventListener('click', handleClick);
      });
    };

  }, [svgContent]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    }}>
      <div 
        style={{ 
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 0
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
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
        {clickedObject && (
          <div style={{ color: 'black' }}>
            <h3>Clicked Object:</h3>
            <pre>{JSON.stringify(clickedObject, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
