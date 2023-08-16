import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from "pinia";

const pinia = createPinia()

import { IonicVue, IonPage, IonTitle, IonCardTitle, IonCardSubtitle, IonContent, IonGrid, IonRow, IonCol, IonIcon, IonButton, IonCard, IonCardContent, IonCardHeader, IonModal, IonInput, IonList, IonItem, IonToolbar  } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia);

app.component('ion-page', IonPage)
app.component('ion-content', IonContent)
app.component('ion-grid', IonGrid)
app.component('ion-row', IonRow)
app.component('ion-col', IonCol)
app.component('ion-icon', IonIcon)
app.component('ion-button', IonButton)
app.component('ion-card', IonCard)
app.component('ion-card-content', IonCardContent)
app.component('ion-title', IonTitle)
app.component('ion-card-title', IonCardTitle)
app.component('ion-card-subtitle', IonCardSubtitle)
app.component('ion-card-header', IonCardHeader)
app.component('ion-modal', IonModal)
app.component('ion-input', IonInput)
app.component('ion-list', IonList)
app.component('ion-item', IonItem)
app.component('ion-toolbar', IonToolbar)
  
router.isReady().then(() => {
  app.mount('#app');
});