// plugins/leaflet.ts

import { defineNuxtPlugin } from '#app';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue-leaflet';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('LMap', LMap);
    nuxtApp.vueApp.component('LTileLayer', LTileLayer);
    nuxtApp.vueApp.component('LMarker', LMarker);
    nuxtApp.vueApp.component('LPopup', LPopup);
});
