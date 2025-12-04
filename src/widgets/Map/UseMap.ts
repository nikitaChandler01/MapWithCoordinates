import type { Point } from '@entities/Point';
import { getCursorPositionInPercents } from '@shared/lib/getCursorPositionInPercents';
import { useRef, useState, type Dispatch, type SetStateAction } from 'react';

interface UseMap {
 setPoints: Dispatch<SetStateAction<Point[]>>;
}

export const useMap = ({ setPoints }: UseMap) => {
 const [dragId, setDragId] = useState<number | null>(null);
 const draggingTimer = useRef<any>(null);
 const mapRef = useRef<HTMLDivElement>(null);
 const startDragging = (id: number) => {
  draggingTimer.current = setTimeout(() => {
   setDragId(id);
  }, 500);
 };

 const stopDragging = () => {
  if (draggingTimer.current) clearTimeout(draggingTimer.current);
  if (dragId) {
   setDragId(null);
  }
 };

 const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,) => {
  if (!dragId || !mapRef.current) return;

  const { x, y } = getCursorPositionInPercents(e, mapRef.current);

  setPoints(prev =>
   prev.map(point => (point.id === dragId ? { ...point, x, y } : point))
  );
 };

 return {
  mapRef,
  dragId,
  handleMouseMove,
  setDragId,
  startDragging,
  stopDragging,
 };
};

