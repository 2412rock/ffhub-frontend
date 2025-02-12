import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-video-ad-2',
  templateUrl: './video-ad-2.component.html',
  styleUrl: './video-ad-2.component.css'
})
export class VideoAd2Component {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.el.nativeElement.querySelector('#juicyads-float-container');

    // Set the ad zone ID
    const adZoneScript = this.renderer.createElement('script');
    adZoneScript.type = 'text/javascript';
    adZoneScript.text = "juicy_adzone = '1080535';";
    this.renderer.appendChild(container, adZoneScript);

    // Load the JuicyAds float script
    const floatScript = this.renderer.createElement('script');
    floatScript.type = 'text/javascript';
    floatScript.src = 'https://poweredby.jads.co/js/jfc.js';
    floatScript.charset = 'utf-8';
    this.renderer.appendChild(container, floatScript);
  }
}
