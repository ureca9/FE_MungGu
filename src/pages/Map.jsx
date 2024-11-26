import { useState } from 'react';
import MapSearch from '../components/map/MapSearch';
import MapContainer from '../components/map/MapContainer';
import MapPanel from '../components/map/MapPanel';

const Map = () => {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  return (
    <div className="relative w-full h-[calc(100vh-8rem)]">
      <MapSearch />
      <MapContainer />
      <MapPanel
        isPanelExpanded={isPanelExpanded}
        setIsPanelExpanded={setIsPanelExpanded}
      />
    </div>
  );
};

export default Map;
