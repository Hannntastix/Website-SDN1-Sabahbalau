import { useEffect } from 'react';
import L from 'leaflet';

const MyMap = () => {
    useEffect(() => {
        const map = L.map('map').setView([-5.3839064, 105.3249889], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        const customIcon = L.icon({
            iconUrl: '/assets/Marker.png', 
            iconSize: [32, 45],
            iconAnchor: [16, 32], // Titik jangkar (bagian bawah tengah gambar marker)
            popupAnchor: [0, -32], // Titik popup terkait gambar marker
        });

        L.marker([-5.3839064, 105.3249889], { icon: customIcon }).addTo(map)
            .openPopup();

        return () => {
            map.remove();
        };
    }, []);

    return <div id="map" className='h-[500px] w-[80%] mx-auto' />;
};

export default MyMap;
