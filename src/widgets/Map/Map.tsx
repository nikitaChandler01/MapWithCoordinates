import { TutzingMap } from '@assets/index';
import { Loading } from '@assets/Loading';
import { usePointStore } from '@entities/Point';
import { PointListItem } from '@features/PointListItem';
import { PointsControls } from '@features/PointsControls';
import { CenterBox } from '@shared/ui/CenterBox';
import './Map.scss';
import { useMap } from './UseMap';

const Map = () => {
 const { points, loading, changePoint, setPoints, deletePoint } = usePointStore();
 const { mapRef, dragId, handleMouseMove, startDragging, stopDragging } = useMap({
  setPoints,
 });
 return (
  <div className="map flex gap-4 h-100">
   <div className="map__container h-100" onMouseMove={handleMouseMove}>
    {loading ? (
     <CenterBox>
      <Loading width={84} />
     </CenterBox>
    ) : (
     <div
      className={`map__wrapper h-100 ${!!dragId ? 'map__wrapper--dragging' : ''}`}
      ref={mapRef}
     >
      {points.map(point => (
       <div onMouseDown={() => startDragging(point.id)} onMouseUp={stopDragging}>
        <PointListItem
         onDeleteClick={deletePoint}
         dragId={dragId ?? undefined}
         point={point}
         key={point.id}
         onSaveClick={changePoint}
        />
       </div>
      ))}
      <img className="map__img" src={TutzingMap} height="100%" />
     </div>
    )}
   </div>
   <div className="map__controls">
    <PointsControls />
   </div>
   <div className="map__points-list h-100">
    <pre>{JSON.stringify(points, null, 4)}</pre>
   </div>
  </div>
 );
};

export default Map;

