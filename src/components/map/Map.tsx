import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet';

import './map.scss';

interface SetViewProps {
  coords: LatLngExpression;
}

interface MapProps {
  geolocation: {
    lat: number;
    lng: number;
  };
  tourName: string;
}

const Map: React.FC<MapProps> = ({ geolocation, tourName }) => {
  const SetViewOnClick = ({ coords }: SetViewProps) => {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  };

  if (!geolocation && !tourName) return <></>;
  const { lat, lng } = geolocation;

  return (
    <>
      <div className="map">
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>{tourName} Russo Trip Office</Popup>
          </Marker>
          <SetViewOnClick coords={[lat, lng]} />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
