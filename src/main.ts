import "./assets/widgets.css";
import "./assets/mars3d.css";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import MarsUi from "./components/mars-ui";

const app = createApp(App);
MarsUi(app);

app.mount("#app");
