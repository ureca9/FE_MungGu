import { useState } from 'react';
import MapSearch from '../../components/map/MapSearch';
import MapContainer from '../../components/map/MapContainer';
import MapPanel from '../../components/map/MapPanel';

const Map = () => {
  const [panelState, setPanelState] = useState('expanded');

  return (
    <div className="relative w-full h-[calc(100vh-8rem)]">
      <MapSearch />
      <MapContainer />
      <MapPanel panelState={panelState} setPanelState={setPanelState} />
    </div>
  );
};

export default Map;
