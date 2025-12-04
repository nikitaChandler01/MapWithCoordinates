import type { Point } from '@entities/Point';
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

 const handleMouseMove = (e: React.MouseEvent) => {
  if (!dragId || !mapRef.current) return;

  const rect = mapRef.current.getBoundingClientRect();
  let x = ((e.clientX - rect.left) / rect.width) * 100;
  let y = ((e.clientY - rect.top) / rect.height) * 100;

  x = Math.max(0, Math.min(100, x));
  y = Math.max(0, Math.min(100, y));

  setPoints(prev => prev.map(point => (point.id === dragId ? { ...point, x, y } : point)));
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

