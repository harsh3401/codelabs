import { Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { HomeComponent } from "./home/home.component";
const routeConfig: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home Page",
  },
  {
    path: "details/:id",
    component: DetailsComponent,
    title: "House Details",
  },
];
export default routeConfig;
