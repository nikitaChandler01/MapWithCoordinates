import { useEffect, useRef, useState } from 'react';
import type { Point } from '../../entities/Point/Point.types';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';

interface PointTooltip {
 point: Point;
 isEditing?: boolean;
 editingPoint?: Point | null;
 setEditingPoint: (item: Point | null) => void;
 onDeleteClick: (id: number) => void;
 onSaveClick: (newPoint: Point) => void;
 tooltipTrigger: HTMLElement;
}

const PointTooltip = ({
 point,
 isEditing,
 editingPoint,
 onDeleteClick,
 setEditingPoint,
 onSaveClick,
 tooltipTrigger,
}: PointTooltip) => {
 const [tooltipPos, setTooltipPos] = useState<{
  top: number | string;
  left: number | string;
 }>();
 const tooltipRef = useRef<HTMLDivElement | null>(null);

 //TODO здесь на подумать. В Antd есть autoAdjustOverflow для перерасчета коорд-ов тултипа.
 //Тянуть либу из за такого функционала не разумно
 useEffect(() => {
  const rect = tooltipTrigger.getBoundingClientRect();
  setTooltipPos({
   top: rect.top + window.scrollY,
   left: rect.left + window.scrollX,
  });
 }, []);

 const onEditClick = () => {
  setEditingPoint(point);
 };
 const onSave = () => {
  if (editingPoint) {
   onSaveClick(editingPoint);
   setEditingPoint(null);
  }
 };
 const onChange = (name: keyof Point, value: string | number) => {
  if (editingPoint) {
   setEditingPoint({ ...editingPoint, [name]: value });
  }
 };

 const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
  onChange('name', e.target.value);
 };
 const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
  onChange('amount', Number(e.target.value));
 };

 const onDelete = () => {
  onDeleteClick(point.id);
 };

 return (
  <div
   ref={tooltipRef}
   className="point-list-item__tooltip"
   style={{
    top: tooltipPos?.top,
    left: tooltipPos?.left,
    transform: 'translate(10px, -50%)',
   }}
  >
   <div className="point-list-item__tooltip-content flex-vertical gap-4">
    {isEditing ? <span className="bolder">Редактирование</span> : undefined}
    {isEditing ? (
     <>
      <label>
       <span className="info-message">Наименование</span>
       <Input onChange={onChangeName} value={editingPoint?.name} />
      </label>
      <label>
       <span className="info-message">Количество</span>
       <Input isNumber onChange={onChangeAmount} value={editingPoint?.amount} />
      </label>
     </>
    ) : (
     <>
      <div className="flex gap-1">
       <span className="info-message">Наименование: </span>
       <span>{point.name}</span>
      </div>
      <div className="flex gap-1">
       <span className="info-message">Количество: </span>
       <span>{point.amount}</span>
      </div>
     </>
    )}
    <div className="point-list-item__tooltip-action flex w-100 gap-2 justify-end">
     <Button danger onClick={onDelete}>
      Удалить
     </Button>
     {isEditing ? (
      <>
       <Button onClick={() => setEditingPoint(null)}>Отмена</Button>
       <Button type="primary" onClick={onSave}>
        Сохранить
       </Button>
      </>
     ) : (
      <Button onClick={onEditClick}>Изменить</Button>
     )}
    </div>
   </div>
  </div>
 );
};

export default PointTooltip;

