import MapSearch from '../../components/map/MapSearch';
import MapContainer from '../../components/map/MapContainer';
import MapPanel from '../../components/map/MapPanel';

const Map = () => {
  return (
    <div className="relative w-full h-[calc(100vh-8rem)]">
      <MapSearch />
      <MapContainer />
      <MapPanel />
    </div>
  );
};

export default Map;
