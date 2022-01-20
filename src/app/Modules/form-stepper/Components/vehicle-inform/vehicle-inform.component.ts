import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicle-inform',
  templateUrl: './vehicle-inform.component.html',
  styleUrls: ['./vehicle-inform.component.css'],
})
export class VehicleInformComponent implements OnInit {
  @Input('vehicleInfoForm') vehicleInfoForm!: FormGroup;
  public isVehicleImported: any;
  public isVehicleOwned: any;
  public visaStatus: any;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 40000;
  min = 5000;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;
  selectedCity: any;
  cities = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys', disabled: true },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' },
  ];
  constructor() {}

  ngOnInit(): void {}

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
}
