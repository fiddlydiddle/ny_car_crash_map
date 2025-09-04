import type { BBox, Feature } from "geojson";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import useSupercluster from "use-supercluster";
import type { Map } from 'leaflet';
import { useState } from "react";

export interface ClusterProps {
    points: Feature[];
    zoom: number;
    bounds: BBox;
}
export function Clusterer(props: ClusterProps) {
    const { points, zoom, bounds } = props;
    const { clusters, supercluster } = useSupercluster({
        points: points,
        bounds: bounds,
        zoom: zoom,
        options: { radius: 50, maxZoom: 20 }
    });

    return (
        clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
                cluster: isCluster,
                point_count: pointCount,
                id: id
            } = cluster.properties;

            if (isCluster) {
                return (
                    <Marker
                        key={`cluster-${cluster.id}`}
                        position={[latitude, longitude]}
                    // icon={fetchIcon}
                    />
                )
            }

            return (
                <Marker
                    key={id}
                    position={[latitude, longitude]}
                />
            )
        })
    );
}