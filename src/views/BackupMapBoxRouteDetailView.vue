<template>
    <LayoutWithSidebar>
        <div class="mx-auto max-w-7xl p-4">
            <h1 class="mb-4 text-3xl font-semibold uppercase text-white">Routes {{ routeId }} - {{ vehicleType }}</h1>
            <div class="mb-8 h-[300px] w-full"
                 id="map"></div>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                <!-- Display Routes in Grid -->
                <div :key="index"
                     class="flex cursor-pointer flex-col space-y-4 rounded-lg bg-[#1a1a1a] p-6 shadow-md"
                     v-for="(route, index) in routes">
                    <h4 class="mb-2 border-l-4 py-2.5 pl-4 pr-0 text-sm font-bold uppercase text-white"
                        style="border-color: #18d26e;">
                        {{ route . description }}
                    </h4>

                    <!-- Start and End Locations -->
                    <!-- <p class="mb-4 truncate text-sm text-white">Coords: {{ route . lat }}, {{ route . lon }}</p> -->
                </div>
            </div>
        </div>
    </LayoutWithSidebar>
</template>

<script>
    import LayoutWithSidebar from "../components/LayoutWithSidebar.vue";
    import { supabase } from "../supabase";
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";
    import "leaflet-routing-machine";

    export default {
        components: {
            LayoutWithSidebar,
        },
        data() {
            return {
                route: {},
                routes: [],
                map: null,
                vehicleType: "",
                routeControl: null,
                routeId: "",
            };
        },
        async created() {
            const routeId = this.$route.params.routeId;
            this.vehicleType = this.$route.params.vehicleType;
            this.routeId = this.$route.params.routeId;

            const {
                data,
                error
            } = await supabase
                .from("routes")
                .select("lat, lon, description")
                .eq("vehicle_type", this.vehicleType)
                .eq("route_name", routeId);

            if (error) {
                console.error("Error fetching route details:", error);
            } else {
                this.routes = data;
                if (this.routes.length > 0) {
                    this.route = this.routes; 
                    this.initMap();
                } else {
                    console.error("No route data found for the given vehicle type and route name");
                }
            }
        },
        methods: {
            initMap() {
                if (this.route && this.route.length > 0) {
                    this.map = L.map("map", {
                        zoomControl: true,
                    }).setView([8.9493, 125.5413], 11);

                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: "&copy; OpenStreetMap contributors",
                    }).addTo(this.map);

                
                    this.showRoute(this.route);

                } else {
                    console.error("Route data is missing or incomplete (lat and lon are required).");
                }
            },

            selectRoute(route) {
                if (route && route.lat && route.lon) {
            
                    this.route = route;

                    if (this.routeControl) {
                        this.map.removeControl(this.routeControl);
                    }

                    this.showRoute(route.lat, route.lon);
                } else {
                    console.error("Selected route is missing valid coordinates (lat and lon).");
                }
            },

            showRoute(routeData) {
                try {
                    const waypointsArray = routeData.map(route => L.latLng(route.lat, route.lon));

                    // Add markers at each waypoint
                    waypointsArray.forEach((waypoint) => {
                        L.marker(waypoint)
                            .addTo(this.map)
                            .bindPopup(`<b>Point: (${waypoint.lat}, ${waypoint.lng})</b>`);
                    });

                    this.routeControl = L.Routing.control({
                        waypoints: waypointsArray,
                        router: new L.Routing.osrmv1({
                            serviceUrl: "https://router.project-osrm.org/route/v1",
                        }),
                        showInstructions: false,
                        routeWhileDragging: true,
                        createMarker: () => null,
                    }).addTo(this.map);

                    const bounds = L.latLngBounds(waypointsArray);
                    this.map.fitBounds(bounds);
                } catch (error) {
                    console.error("Error while displaying route:", error);
                }
            }
        },
    };
</script>

<style>
    #map {
        width: 100%;
        height: 300px;
    }

    .leaflet-routing-alternatives-container {
        display: none !important;
    }
</style>
