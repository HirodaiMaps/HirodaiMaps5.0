
interface MapProps {
    lat: string;
    lon: string;
    title: string;
}

const Map: React.FC<MapProps> = ({ lat, lon, title }) => {
    return (
        <>
            <iframe
                id="mapIframe"
                src={"/map/map.html" + `?lat=${lat}&lon=${lon}&title=${title}`}
                title="Map"
                style={{ width: '100%', height: '100%', padding: '0', margin: '0' }}
            ></iframe>
        </>
    );
}

export default Map;
