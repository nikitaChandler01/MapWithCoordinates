import { useCallback, useEffect, useRef, useState } from 'react';
import type { Point } from './Point.types';
import { points as pointsMock } from '../../widgets/Map/constants';

const lsKey = 'points';

export const usePointStore = () => {
 const [points, setPoints] = useState<Point[]>([]);
 const [loading, setLoading] = useState<boolean>(false);

 useEffect(() => {
  //Эмулляция выполнения запроса
  new Promise(() => {
   setLoading(true);
   setTimeout(() => {
    const savedPoints = localStorage.getItem(lsKey);
    let points =
     savedPoints && savedPoints?.length > 0 ? JSON.parse(savedPoints) : pointsMock;
    setPoints(points.map((item: Point, id: number) => ({ ...item, id })));
    setLoading(false);
   }, 3000);
  });
 }, []);

 useEffect(() => {
  if (points.length > 0) {
   savePointsInLs();
  }
 }, [points]);

 const savePointsInLs = () => {
  localStorage.setItem(lsKey, JSON.stringify(points));
 };

 const selectPoints = () => points;

 const addPoint = (point: Point) => {
  setPoints(prev => [...prev, point]);
 };

 const deletePoint = (deletedId: number) => {
  setPoints(prev => prev.filter(({ id }) => id !== deletedId));
 };

 const changePoint = useCallback((newPoint: Point) => {
  setPoints(prev => prev.map(item => (item.id === newPoint.id ? newPoint : item)));
 }, []);
 const resetPoints = () => {
  localStorage.removeItem(lsKey);
  setPoints(pointsMock.map((item, id) => ({ ...item, id })));
 };

 return {
  points,
  loading,
  setPoints,
  selectPoints,
  addPoint,
  deletePoint,
  changePoint,
  resetPoints,
 };
};

