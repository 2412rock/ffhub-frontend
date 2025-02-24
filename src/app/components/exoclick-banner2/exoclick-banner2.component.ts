import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-exoclick-banner2',
  templateUrl: './exoclick-banner2.component.html',
  styleUrl: './exoclick-banner2.component.css'
})
export class ExoclickBanner2Component {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.el.nativeElement.querySelector('#adContainer');

    // 1. Create the external script element for the ad provider.
    const script1 = this.renderer.createElement('script');
    script1.type = 'application/javascript';
    script1.async = true;
    script1.src = 'https://a.magsrv.com/ad-provider.js';
    this.renderer.appendChild(container, script1);

    // 2. Create the <ins> element that will hold the ad.
    const insElement = this.renderer.createElement('ins');
    insElement.className = 'eas6a97888e2';
    insElement.setAttribute('data-zoneid', '5549636');
    this.renderer.appendChild(container, insElement);

    // 3. Create the inline script element to initialize the ad.
    const script2 = this.renderer.createElement('script');
    script2.type = 'application/javascript';
    script2.text = '(AdProvider = window.AdProvider || []).push({"serve": {}});';
    this.renderer.appendChild(container, script2);
  }
  
}
