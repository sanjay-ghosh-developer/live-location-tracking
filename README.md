# live-location-tracking

[<img width="600" alt="live-location-tracking" src="https://raw.githubusercontent.com/sanjay-ghosh-developer/live-location-tracking/main/frontend/public/Screenshot%20(10).png">](https://www.mapbox.com/mapbox-gljs)


Quick way to start the app


1. Clone this repo 
 
  ```sh
    git clone https://github.com/maptiler/get-started-react-maplibre-gl-js.git my-react-map
  ```

2. Navigate to the newly created project folder **my-react-map**
  ```sh
    cd live-location-tracking
  ```

3. :warning: Open the frontend/.env file and replace **YOUR_MAPBOXGL_ACCESSTOKEN** with your actual [MapBox API key](https://account.mapbox.com/access-tokens/).

  :information_source: If you don't have an API KEY you can create it for **FREE** at https://www.mapbox.com/

  
4. Run docker-compose file
  ```sh
    docker compose up -d
  ```
4. Run live gps movement silulation file
  ```sh
    node simulator.js
  ```
6. You will find your app on address http://localhost:3000/. Now you should see the map in your browser.

## Build With
https://www.npmjs.com/package/socket.io
* [React.js](https://reactjs.org/)
* [Express](https://www.npmjs.com/package/express)
* [PostGis](https://registry.hub.docker.com/r/postgis/postgis/)
* [MapboxGL](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/)
* [Docker](https://www.docker.com)
* [Socket.io](https://www.npmjs.com/package/socket.io)



<p align="right">(<a href="#top">back to top</a>)</p>
