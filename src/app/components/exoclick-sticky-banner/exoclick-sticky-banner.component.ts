import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-exoclick-sticky-banner',
  templateUrl: './exoclick-sticky-banner.component.html',
  styleUrl: './exoclick-sticky-banner.component.css'
})
export class ExoclickStickyBannerComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.el.nativeElement.querySelector('#adContainer');

    // 1. Create the external script element for the ad provider.
    const script = this.renderer.createElement('script');
    script.async = true;
    script.type = 'application/javascript';
    script.src = 'https://a.magsrv.com/ad-provider.js';
    this.renderer.appendChild(container, script);

    // 2. Create the <ins> element for the ad.
    const insElement = this.renderer.createElement('ins');
    insElement.className = 'eas6a97888e17'; // Use appropriate class or id
    insElement.setAttribute('data-zoneid', '5549594');
    this.renderer.appendChild(container, insElement);

    // 3. Create the inline script to initialize the ad.
    const initScript = this.renderer.createElement('script');
    initScript.type = 'application/javascript';
    initScript.text = '(AdProvider = window.AdProvider || []).push({"serve": {}});';
    this.renderer.appendChild(container, initScript);
  }

}
