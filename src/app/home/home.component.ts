import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "./../housing-location";
import { HousingService } from "./../housing.service";
@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, ReactiveFormsModule],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Filter by city"
          formControlName="filter"
          #filter
        />
        <button
          class="primary"
          type="button"
          (click)="filterValue(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      >
      </app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filterValue(filter: string) {
    if (!filter) this.filteredLocationList = this.housingLocationList;
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation.city.toLowerCase().includes(filter.toLowerCase())
    );
  }
  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }
}
