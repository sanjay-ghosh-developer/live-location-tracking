async function simulate() {
    let data = await fetch('https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    data = await data.json()
    const coordinates = data.features[0].geometry.coordinates;
    for (let coordinate of coordinates) {
        await new Promise(resolve => setTimeout(resolve, 500));
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "user_id": 1,
            "latitude": coordinate[1],
            "longitude": coordinate[0],
            "timestamp": new Date().toISOString()
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("http://localhost:8082/api/locations", requestOptions)
    }
}
simulate()