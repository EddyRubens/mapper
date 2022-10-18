import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent | undefined;
  
  public display: any;
  public zoom = 22;
  public center: google.maps.LatLngLiteral = { lat: 50.873920156349776, lng: 4.7039938778997925 }; // Agora
  public markerPositions: google.maps.LatLngLiteral[] = [];
  public markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  private lastLocation: google.maps.LatLngLiteral = this.center;
  public qrCodeValue: any;
  
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(location => {
      this.center = { lat: location.coords.latitude, lng: location.coords.longitude };
    });
  }

  ngAfterViewInit(): void {
  }

  onStarted() {
    console.log('onStarted');
  }

  onValueChanges(result: any) {
    this.qrCodeValue = result.codeResult.code;
    this.addMarker(this.lastLocation, this.qrCodeValue);
    navigator.vibrate([100, 200, 200, 200, 500]);
    this.barcodeScanner!.stop();
  }

  public moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  public move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  
  private addMarker(position: google.maps.LatLngLiteral, qrCodeValue: string) {
    // TODO: add qrCodeValue to marker
    this.markerPositions.push(position);
  }

  public scanQrCode() {
    navigator.geolocation.getCurrentPosition(location => {
      this.lastLocation = { lat: location.coords.latitude, lng: location.coords.longitude };
      this.barcodeScanner!.start();
    });
  }
}
