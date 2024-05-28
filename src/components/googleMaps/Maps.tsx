"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useRef } from "react";

export function Maps() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
    });

    async function initMap() {
      await loader.importLibrary("maps");
      await loader.importLibrary("marker");

      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: -32.920546, lng: -68.806261 },
          zoom: 15,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID as string,
        });

        const position = { lat: -32.920546, lng: -68.806261 };
        new google.maps.marker.AdvancedMarkerElement({
          position,
          map,
          title: "Mi Ubicación",
        });
      }
    }

    initMap().catch(console.error);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-[#384B59] text-4xl font-bold text-center max-[1400px]:text-2xl max-[800px]:text-xl mb-[50px]">
        Ubicación del barrio
      </h2>
      <div
        className="h-[500px] w-[70%] border-4 border-white mb-[50px] rounded-[10px]"
        ref={mapRef}
      ></div>
    </div>
  );
}
