import { type Point } from '@entities/Point';
import { memo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './PointListItem.scss';
import PointTooltip from './PointTooltip';

interface PointListItem {
 dragId?: number;
 point: Point;
 onSaveClick: (newPoint: Point) => void;
 onDeleteClick: (id: number) => void;
}

const PointListItem = ({ dragId, point, onSaveClick, onDeleteClick }: PointListItem) => {
 const [isHovered, setIsHovered] = useState<boolean>(false);
 const [editingPoint, setEditingPoint] = useState<Point | null>(null);
 const isDragging = !!dragId;
 const isEditing = !!editingPoint;
 const timerRef = useRef<any>(null);
 const itemRef = useRef<HTMLDivElement>(null);

 const onSaveClick_ = (point: Point) => {
  onSaveClick(point);
  setIsHovered(false);
 };

 const onMouseEnter = () => {
  if (isDragging) return;
  if (timerRef.current) clearTimeout(timerRef.current);
  setIsHovered(true);
 };
 const onMouseLeave = () => {
  if (isDragging) return;
  timerRef.current = setTimeout(() => {
   setEditingPoint && setEditingPoint(null);
   setIsHovered(false);
  }, 100);
 };

 return (
  <div
   className="point-list-item"
   ref={itemRef}
   onMouseLeave={onMouseLeave}
   style={{
    left: `${point.x}%`,
    top: `${point.y}%`,
    transform: 'translate(-50%, -50%)',
   }}
  >
   {isHovered && !isDragging
    ? createPortal(
       <PointTooltip
        onDeleteClick={onDeleteClick}
        point={point}
        isEditing={isEditing}
        editingPoint={editingPoint}
        onSaveClick={onSaveClick_}
        setEditingPoint={setEditingPoint}
        tooltipTrigger={itemRef.current!}
       />,
       document.body
      )
    : undefined}
   <div className="flex-vertical align-items-center point-list-item__dot-container">
    <div
     onMouseEnter={onMouseEnter}
     className={`point-list-item__dot ${
      isDragging ? 'point-list-item__dot--dragging' : ''
     }`}
    />
   </div>
  </div>
 );
};

export default memo(PointListItem);

