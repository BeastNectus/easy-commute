<template>
  <LayoutWithSidebar>
    <div>
      <LMap :zoom="zoom" :center="center" style="height: 500px;">
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          :attribution="attribution"
        />
        <!-- Loop through the routes and add markers/lines -->
        <LPolyline :lat-lngs="getRouteCoordinates(route)" v-for="route in routes" :key="route.id" />
        <LMarker :lat-lng="getRouteCoordinates(route)[0]" v-for="route in routes" :key="route.id">
          <LPopup>
            <div>
              <h4>{{ route.route_name }}</h4>
              <img :src="route.img_url" alt="Route Image" style="width: 100px; height: auto;" />
              <p>{{ route.description }}</p>
              <p>Tariff: ${{ route.tariff }}</p>
            </div>
          </LPopup>
        </LMarker>
      </LMap>
    </div>
  </LayoutWithSidebar>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LPolyline } from "@vue-leaflet/vue-leaflet"; // Updated import
import 'leaflet/dist/leaflet.css';
import { supabase } from '../supabase';
import LayoutWithSidebar from '../components/LayoutWithSidebar.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LPolyline
  },
  data() {
    return {
      zoom: 12,
      center: [51.505, -0.09], // Default center (e.g., London)
      routes: [],
      attribution: '© OpenStreetMap contributors',
    };
  },
  async created() {
    const { data, error } = await supabase
      .from('routes') // Fetch routes from Supabase
      .select('*');
    if (error) {
      console.error('Error fetching routes:', error);
    } else {
      this.routes = data;
    }
  },
  methods: {
    getRouteCoordinates(route) {
      // Assume start_location and end_location are in the format: "lat,lng"
      const start = route.start_location.split(',');
      const end = route.end_location.split(',');
      return [
        [parseFloat(start[0]), parseFloat(start[1])],
        [parseFloat(end[0]), parseFloat(end[1])],
      ];
    }
  }
};
</script>

<style scoped>
/* Optional: Style the map */
</style>
