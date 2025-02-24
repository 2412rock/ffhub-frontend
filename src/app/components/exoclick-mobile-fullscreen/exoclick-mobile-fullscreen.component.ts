import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-exoclick-mobile-fullscreen',
  templateUrl: './exoclick-mobile-fullscreen.component.html',
  styleUrl: './exoclick-mobile-fullscreen.component.css'
})
export class ExoclickMobileFullscreenComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.el.nativeElement.querySelector('#adContainer');

    // 1. Create the external script element for the ad provider.
    const script1 = this.renderer.createElement('script');
    script1.type = 'application/javascript';
    script1.async = true;
    script1.src = 'https://a.pemsrv.com/ad-provider.js';
    this.renderer.appendChild(container, script1);

    // 2. Create the <ins> element that will hold the ad.
    const insElement = this.renderer.createElement('ins');
    insElement.className = 'eas6a97888e33';
    insElement.setAttribute('data-zoneid', '5549708');
    this.renderer.appendChild(container, insElement);

    // 3. Create the inline script element to initialize the ad.
    const script2 = this.renderer.createElement('script');
    script2.text = '(AdProvider = window.AdProvider || []).push({"serve": {}});';
    this.renderer.appendChild(container, script2);
  }
}
