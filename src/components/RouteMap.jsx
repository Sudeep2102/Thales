import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function RouteMap({ routeData, activeRoute }) {
  if (!routeData) return null;

  // Calculate center point of all markers
  const allPoints = [
    ...(activeRoute === 'both' || activeRoute === 'original' ? routeData.original.path : []),
    ...(activeRoute === 'both' || activeRoute === 'optimized' ? routeData.optimized.path : [])
  ];

  const center = allPoints.reduce(
    (acc, point) => {
      acc[0] += point[0];
      acc[1] += point[1];
      return acc;
    },
    [0, 0]
  ).map(sum => sum / allPoints.length);

  // Calculate bounds to fit all points
  const bounds = L.latLngBounds(allPoints);

  return (
    <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={center}
        bounds={bounds}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {(activeRoute === 'both' || activeRoute === 'original') && (
          <>
            <Polyline
              positions={routeData.original.path}
              color="red"
              weight={3}
              dashArray="5, 10"
            />
            {routeData.original.path.map((point, index) => (
              <Marker key={`original-${index}`} position={point}>
                <Popup>
                  {index === 0 ? 'Start' : 
                   index === routeData.original.path.length - 1 ? 'End' :
                   `Waypoint ${index}`}
                </Popup>
              </Marker>
            ))}
          </>
        )}
        
        {(activeRoute === 'both' || activeRoute === 'optimized') && (
          <>
            <Polyline
              positions={routeData.optimized.path}
              color="green"
              weight={3}
            />
            {routeData.optimized.path.map((point, index) => (
              <Marker key={`optimized-${index}`} position={point}>
                <Popup>
                  {index === 0 ? 'Start' : 
                   index === routeData.optimized.path.length - 1 ? 'End' :
                   `Optimized Waypoint ${index}`}
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default RouteMap;