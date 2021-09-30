/**
 * Map control container for use as a parent component
 * @constant POSITION_CLASSES Classes used by Leaflet to position controls
 */

// Classes used by Leaflet to position controls.
const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
};
const MapCustomControl = (props) => {
    const { position, containerProps, children } = props;
    return (<div className={POSITION_CLASSES[position]}>
            <div className='leaflet-control leaflet-bar' {...containerProps}>
                {children}
            </div>
        </div>);
};
MapCustomControl.defaultProps = {
    position: 'topleft',
    containerProps: {},
    children: null,
};
export default MapCustomControl;
