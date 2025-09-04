import { useEffect, useState } from 'react'
import 'react-leaflet-markercluster/styles';
import './App.css'
import type { CarCrash } from './interfaces/carCrash'
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import type { BBox, Feature } from 'geojson';
import { Clusterer } from './components/Clusterer/Clusterer';

function App() {
  const [carCrashes, setCarCrashes] = useState<CarCrash[]>([]);
  const [points, setPoints] = useState<Feature[]>([]);
  const [mapBounds, set]
  const map = useMapEvents({
    zoom: getMapBounds
  });

  // Component initialization
  useEffect(() => {
    fetch('/collision-data.json')
      .then(response => response.json())
      .then((data: CarCrash[]) => {
        setCarCrashes(data);
        setPoints(data.map(datum => ({
          type: 'Feature',
          properties: {
            cluster: false,
            id: crypto.randomUUID(),
          },
          geometry: {
            type: 'Point',
            coordinates: [
              datum.LONGITUDE,
              datum.LATITUDE
            ]
          }
        })));
      })
      .catch(error => console.error('Error fetching data:', error))
  }, []);

  const getMapBounds = () => {
    console.log(map.getBounds())
    const bounds = map.getBounds();
    return [
      bounds.getSouthWest().lng,
      bounds.getSouthWest().lat,
      bounds.getNorthEast().lng,
      bounds.getNorthEast().lat,
    ] as BBox;
  }

  return (
    <>
      <div>
        <MapContainer
          center={[40.7128, -74.0060]}
          zoom={10}
          id="map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Clusterer
            points={points}
            zoom={map.getZoom()}
            bounds={getMapBounds()}
          />
          {/* <MarkerClusterGroup>
            {carCrashes && carCrashes.slice(0, 1000).map(crash => (
              <Marker
                key={crypto.randomUUID()}
                position={[crash.LATITUDE, crash.LONGITUDE]}
              >
                <Popup>
                  <h6>{crash["CRASH DATE"]?.toString()}</h6>
                  <p>Borough: {crash.BOROUGH}</p>
                  <p>Number of Persons Injured: {crash["NUMBER OF PERSONS INJURED"]}</p>
                  <p>Number of Persons Killed: {crash["NUMBER OF PERSONS KILLED"]}</p>
                  <p>Number of Pedestrians Injured: {crash["NUMBER OF PEDESTRIANS INJURED"]}</p>
                  <p>Number of Pedestrians Killed: {crash["NUMBER OF PEDESTRIANS KILLED"]}</p>
                  <p>Number of Cyclists Injured: {crash["NUMBER OF CYCLIST INJURED"]}</p>
                  <p>Number of Cyclists Killed: {crash["NUMBER OF CYCLIST KILLED"]}</p>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup> */}
        </MapContainer>
      </div>
      <div>
        <h3>Car Crashes in New York City</h3>
        <table>
          <thead>
            <tr>
              <th>Crash Date</th>
              <th>Crash Time</th>
              <th>Borough</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Number of Persons Injured</th>
              <th>Number of Persons Killed</th>
              <th>Number of Pedestrians Injured</th>
              <th>Number of Pedestrians Killed</th>
              <th>Number of Cyclists Injured</th>
              <th>Number of Cyclists Killed</th>
            </tr>
          </thead>
          <tbody>
            {carCrashes && carCrashes.slice(0, 1000).map(crash => (
              <tr key={crypto.randomUUID()}>
                <td>{crash["CRASH DATE"]?.toString()}</td>
                <td>{crash["CRASH TIME"]}</td>
                <td>{crash.BOROUGH}</td>
                <td>{crash.LATITUDE}</td>
                <td>{crash.LONGITUDE}</td>
                <td>{crash["NUMBER OF PERSONS INJURED"]}</td>
                <td>{crash["NUMBER OF PERSONS KILLED"]}</td>
                <td>{crash["NUMBER OF PEDESTRIANS INJURED"]}</td>
                <td>{crash["NUMBER OF PEDESTRIANS KILLED"]}</td>
                <td>{crash["NUMBER OF CYCLIST INJURED"]}</td>
                <td>{crash["NUMBER OF CYCLIST KILLED"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
