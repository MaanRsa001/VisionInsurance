import { ClaimamountIconComponent } from './Components/claimamount-icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlateIconComponent } from './Components/plate-icon';
import { DriverIconComponent } from './Components/driver-icon';
import { LicenseIconComponent } from './Components/license-icon';
import { NumberIconComponent } from './Components/number-icon';
import { PlatenumberIconComponent } from './Components/platenumber-icon';
import { SeatIconComponent } from './Components/seat-icon';
import { TrimIconComponent } from './Components/trim-icon';
import { GeoIconComponent } from './Components/geo-icon';
import { ClaimIconComponent } from './Components/claim-icon';
import { ImportIconComponent } from './Components/import-icon';
import { CalenderIconComponent } from './Components/calender-icon';
import { TonneIconComponent } from './Components/tonne-icon';
import { WheelIconComponent } from './Components/wheel-icon';
import { PromocodeIconComponent } from './Components/promocode-icon';
import { MembercardIconComponent } from './Components/membercard-icon';
import { MobileIconComponent } from './Components/mobile-icon';
import { RightIconComponent } from './Components/right-icon';



@NgModule({
  declarations: [
    PlateIconComponent,
    DriverIconComponent,
    LicenseIconComponent,
    NumberIconComponent,
    PlatenumberIconComponent,
    SeatIconComponent,
    TrimIconComponent,
    GeoIconComponent,
    ClaimIconComponent,
    ImportIconComponent,
    CalenderIconComponent,
    ClaimamountIconComponent,
    TonneIconComponent,
    WheelIconComponent,
    PromocodeIconComponent,
    MembercardIconComponent,
    MobileIconComponent,
    RightIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlateIconComponent,
    DriverIconComponent,
    LicenseIconComponent,
    NumberIconComponent,
    PlatenumberIconComponent,
    SeatIconComponent,
    TrimIconComponent,
    GeoIconComponent,
    ClaimIconComponent,
    ImportIconComponent,
    CalenderIconComponent,
    ClaimamountIconComponent,
    TonneIconComponent,
    WheelIconComponent,
    PromocodeIconComponent,
    MembercardIconComponent,
    MobileIconComponent
  ],
})
export class IconsModule { }
