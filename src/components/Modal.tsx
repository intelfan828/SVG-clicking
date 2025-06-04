import React, { useState } from 'react';

interface SVGObjectInfo {
  id: string;
  tagName: string;
  className: string;
  attributes: { [key: string]: string };
  path?: string;
  children?: SVGObjectInfo[];
  position?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  };
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SVGObjectInfo | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [isCloseButtonHovered, setIsCloseButtonHovered] = useState(false);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '90%',
        maxHeight: '90%',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <button
          onClick={onClose}
          onMouseEnter={() => setIsCloseButtonHovered(true)}
          onMouseLeave={() => setIsCloseButtonHovered(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            border: 'none',
            background: isCloseButtonHovered ? '#f0f0f0' : 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.2s'
          }}
        >
          ×
        </button>
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '24px',
          color: '#1a1a1a',
          fontSize: '24px',
          fontWeight: '600'
        }}>Element Details</h2>
        {data && (
          <div style={{ color: '#333' }}>
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                color: '#1a1a1a',
                fontSize: '18px',
                marginBottom: '16px',
                fontWeight: '500'
              }}>Basic Information</h3>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '8px 16px',
                alignItems: 'baseline'
              }}>
                <span style={{ fontWeight: '500', color: '#666' }}>ID:</span>
                <span>{data.id || 'N/A'}</span>
                <span style={{ fontWeight: '500', color: '#666' }}>Type:</span>
                <span>{data.tagName}</span>
                <span style={{ fontWeight: '500', color: '#666' }}>Class:</span>
                <span>{data.className}</span>
              </div>
            </section>

            {data.position && (
              <section style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  color: '#1a1a1a',
                  fontSize: '18px',
                  marginBottom: '16px',
                  fontWeight: '500'
                }}>Position Information</h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '8px 16px',
                  alignItems: 'baseline'
                }}>
                  <span style={{ fontWeight: '500', color: '#666' }}>Left:</span>
                  <span>{data.position.left.toFixed(2)}</span>
                  <span style={{ fontWeight: '500', color: '#666' }}>Top:</span>
                  <span>{data.position.top.toFixed(2)}</span>
                  <span style={{ fontWeight: '500', color: '#666' }}>Right:</span>
                  <span>{data.position.right.toFixed(2)}</span>
                  <span style={{ fontWeight: '500', color: '#666' }}>Bottom:</span>
                  <span>{data.position.bottom.toFixed(2)}</span>
                  <span style={{ fontWeight: '500', color: '#666' }}>Width:</span>
                  <span>{data.position.width.toFixed(2)}</span>
                  <span style={{ fontWeight: '500', color: '#666' }}>Height:</span>
                  <span>{data.position.height.toFixed(2)}</span>
                </div>
              </section>
            )}

            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                color: '#1a1a1a',
                fontSize: '18px',
                marginBottom: '16px',
                fontWeight: '500'
              }}>Attributes</h3>
              <pre style={{ 
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: '8px',
                overflow: 'auto',
                border: '1px solid #e9ecef',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#495057'
              }}>
                {JSON.stringify(data.attributes, null, 2)}
              </pre>
            </section>

            {data.path && (
              <section style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  color: '#1a1a1a',
                  fontSize: '18px',
                  marginBottom: '16px',
                  fontWeight: '500'
                }}>Path Data</h3>
                <pre style={{ 
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  border: '1px solid #e9ecef',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: '#495057'
                }}>
                  {data.path}
                </pre>
              </section>
            )}

            {data.children && data.children.length > 0 && (
              <section style={{ marginBottom: '24px' }}>
                <h3 style={{ 
                  color: '#1a1a1a',
                  fontSize: '18px',
                  marginBottom: '16px',
                  fontWeight: '500'
                }}>Children</h3>
                <pre style={{ 
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  border: '1px solid #e9ecef',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: '#495057'
                }}>
                  {JSON.stringify(data.children, null, 2)}
                </pre>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 