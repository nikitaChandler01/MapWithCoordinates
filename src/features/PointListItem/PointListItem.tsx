import { type Point } from '@entities/Point';
import { memo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './PointListItem.scss';
import PointTooltip from './PointTooltip';

interface PointListItem {
 point: Point;
 onSaveClick: (newPoint: Point) => void;
}

const PointListItem = ({ point, onSaveClick }: PointListItem) => {
 const [isHovered, setIsHovered] = useState<boolean>(false);
 const [editingPoint, setEditingPoint] = useState<Point | null>(null);

 const isEditing = !!editingPoint;
 const timerRef = useRef<any>(null);
 const itemRef = useRef<HTMLDivElement>(null);

 const onSaveClick_ = (point: Point) => {
  onSaveClick(point);
  setIsHovered(false);
 };

 const onMouseEnter = () => {
  if (timerRef.current) clearTimeout(timerRef.current);
  setIsHovered(true);
 };
 const onMouseLeave = () => {
  timerRef.current = setTimeout(() => {
   setEditingPoint && setEditingPoint(null);
   setIsHovered(false);
  }, 100);
 };

 return (
  <div
   className="point-list-item"
   onMouseEnter={onMouseEnter}
   onMouseLeave={onMouseLeave}
   ref={itemRef}
   style={{
    left: `${point.x}%`,
    top: `${point.y}%`,
    transform: 'translate(-50%, -50%)',
   }}
  >
   {isHovered
    ? createPortal(
       <PointTooltip
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
   <div className="point-list-item__dot" />
  </div>
 );
};

export default memo(PointListItem);

