import { TutzingMap } from '@assets/index';
import { Loading } from '@assets/Loading';
import { PointListItem } from '@features/PointListItem';
import { PointsControls } from '@features/PointsControls';
import { CenterBox } from '@shared/ui/CenterBox';
import './Map.scss';
import { usePointStore } from '@entities/Point';

const Map = () => {
 const { points, loading, changePoint } = usePointStore();
 return (
  <div className="map flex gap-4 h-100">
   <div className="map__container h-100">
    {loading ? (
     <CenterBox>
      <Loading width={84} />
     </CenterBox>
    ) : (
     <div className="map__wrapper h-100">
      {points.map(point => (
       <PointListItem point={point} key={point.id} onSaveClick={changePoint} />
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

