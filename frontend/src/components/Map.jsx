import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import io from 'socket.io-client';
import './map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN;

const Map = () => {
  const socket = io(process.env.REACT_APP_SOCKET_URL); 
  const [map, setMap] = useState(null);
  const [userData, setUserData] = useState({userId:'',lat:'',lng:''});
  const [marker, setMarker] = useState(null);
  const [lineSource, setLineSource] = useState({
    type: 'FeatureCollection',
    features: [],
  });


  useEffect(() => {
    // Initialize the map
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [22.56263, 88.36304], // Default center 
        zoom: 15, // Default zoom level
      });
      const markerInstance = new mapboxgl.Marker({
        color: '#F84C4C' // color it red
      });
      // Add a GeoJSON source for the line
      mapInstance.on('load', () => {
        mapInstance.addSource('line-source', {
          type: 'geojson',
          data: lineSource,
        });

        // Add a line layer to display the route
        mapInstance.addLayer({
          id: 'line-layer',
          type: 'line',
          source: 'line-source',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': 'blue',
            'line-width': 2,
          },
        });
        mapInstance.setPitch(30);

        setMap(mapInstance);
        setMarker(markerInstance)
      });
    };

    if (!map) {
      initializeMap();
    }
  }, [map, lineSource, marker]);
  //   // Simulate live location updates (replace this with your data source)
  //   const updateLocation = () => {
  //     if (map) {
  //       const randomLatitude = 40.7128 + (Math.random() - 0.5) * 0.1;
  //       const randomLongitude = -74.006 + (Math.random() - 0.5) * 0.1;

  //       const newLine = {
  //         type: 'Feature',
  //         geometry: {
  //           type: 'LineString',
  //           coordinates: [...lineSource.features[0]?.geometry.coordinates || [], [randomLongitude, randomLatitude]],
  //         },
  //       };

  //       setLineSource((prevSource) => ({
  //         ...prevSource,
  //         features: [newLine],
  //       }));


  //       map.getSource('line-source').setData(lineSource);
  //       map.panTo([randomLongitude, randomLatitude]);
  //       marker.setLngLat([randomLongitude, randomLatitude])
  //       marker.addTo(map);
  //     }
  //   };

  //   const interval = setInterval(updateLocation, 100); // Update location every 3 seconds

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [lineSource, map, marker]);

  useEffect(() => {
    socket.on('locationUpdate', (data) => {
      if (map) {
        const newLine = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [...lineSource.features[0]?.geometry.coordinates || [], [data.longitude, data.latitude]],
          },
        };
        setLineSource((prevSource) => ({
          ...prevSource,
          features: [newLine],
        }));
        setUserData({userId:data.user_id,lat:data.latitude,lng:data.longitude})
        map.getSource('line-source').setData(lineSource);
        map.panTo([data.longitude, data.latitude]);
        marker.setLngLat([data.longitude, data.latitude])
        marker.addTo(map);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [lineSource, map, marker,socket,userData]);

  return (
    <div>
      <div className="sidebar">
        UserId: {userData.userId} | Longitude: {userData.lng} | Latitude: {userData.lat}
      </div>
      <div id="map" style={{ width: '100%', height: '100%' }} />
    </div>

  );
};

export default Map;