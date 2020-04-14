import { SoapService } from "./services/soap.service";
import { Component, ViewChild } from "@angular/core";
import { Planet } from "src/app/models/planet";
import { Subject } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { DataService } from "./services/data.service";
import { Path } from "./models/path";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
 
  sourcePlanet: any;
  destinationPlanet: any;
  source: string;
  dest:string;
  duration:string;
  distance:string;
  path: any;
  planets: Planet[];
  planet: any;
  displayData: boolean;

  constructor(
    public fb: FormBuilder,
    private dataService: DataService,
    private soapSertive: SoapService,
  ) {}
  ngOnInit() {
    this.dataService.findAll().subscribe((data) => {
      this.planets = data;
      this.sourcePlanet = this.planets.map((a) => a.planet_name);
      this.destinationPlanet = this.planets.map((a) => a.planet_name);
      this.displayData = false;
    });
  }

  findPath = this.fb.group({
    sourcePlanetname: [""],
    destinationPlanetname: [""],
  });

  findShortestDistance() {

    this.dataService
      .findDirection(
        this.findPath.value.sourcePlanetname,
        this.findPath.value.destinationPlanetname
      )
      .subscribe((data) => {
        this.source = data.source;
        this.dest = data.destination;
        this.duration = data.duration;
        this.distance= data.distance;
        this.path= data.path;
      });
    this.displayData = true;
    
  }
}
