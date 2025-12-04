import { getCursorPositionInPercents } from '@shared/lib/getCursorPositionInPercents';
import React, { useEffect, useRef, useState } from 'react';
import './ContextMenu.scss';

const ContextMenuProvider = ({
 children,
 contextMenuNode,
}: {
 children: React.ReactNode;
 contextMenuNode: ({ x, y }: { x: number; y: number }) => React.ReactNode;
}) => {
 const [clicked, setClicked] = useState(false);
 const [points, setPoints] = useState({
  x: 0,
  y: 0,
 });
 const childRef = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const handleClick = () => setClicked(false);
  window.addEventListener('click', handleClick);
  return () => {
   window.removeEventListener('click', handleClick);
  };
 }, []);

 return (
  <div
   className="h-100 w-100"
   style={{ position: 'relative' }}
   onContextMenu={e => {
    e.preventDefault();
    setClicked(true);
    if (childRef.current) {
     const { x, y } = getCursorPositionInPercents(e, childRef.current);
     setPoints({
      x,
      y,
     });
    }
   }}
  >
   <div className="w-100 h-100" ref={childRef}>
    {children}
   </div>
   {clicked && (
    <div
     className="context-menu-content"
     style={{
      top: `${points.y}%`,
      left: `${points.x}%`,
     }}
    >
     {contextMenuNode(points)}
    </div>
   )}
  </div>
 );
};

export default ContextMenuProvider;

