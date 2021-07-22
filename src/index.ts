/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import './style.css';

// This example converts a polyline to a dashed line, by
// setting the opacity of the polyline to 0, and drawing an opaque symbol
// at a regular interval on the polyline.
function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 6,
      center: { lat: 38.022873168097234, lng: 23.876972833830287 },
      mapTypeId: 'terrain'
    }
  );
  const athens = { lat: 38.022873168097234, lng: 23.876972833830287 };
  const crete = { lat: 35.04429311674466, lng: 25.195151512284898 };

  var mk1 = new google.maps.Marker({position: athens, map: map});
  var mk2 = new google.maps.Marker({position: crete, map: map});

  var line = new google.maps.Polyline({path: [athens, crete], map: map});

  var distance = haversine_distance(mk1, mk2);
  var distanceInKm = distance * 1.609344
  let message = document.getElementById('msg') as HTMLElement;
  message.innerHTML = "Distance between markers: " + distanceInKm.toFixed(2) + "km";

  console.log(distance)
}
export { initMap };
