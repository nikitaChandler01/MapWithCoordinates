import { useCallback, useEffect, useState } from 'react';
import { points as pointsMock } from '../../widgets/Map/constants';
import type { Point } from './Point.types';

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

 const addPoint = ({ x, y }: { x: number; y: number }) => {
  const date = new Date();
  const day = date.getUTCDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  setPoints(prev => [
   ...prev,
   {
    id: Date.now(),
    name: `Новая точка от ${hours}:${minutes} ${day}.${month}.${year}`,
    amount: 0,
    x,
    y,
   },
  ]);
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

