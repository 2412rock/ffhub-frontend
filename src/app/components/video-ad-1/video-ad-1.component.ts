import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-video-ad-1',
  templateUrl: './video-ad-1.component.html',
  styleUrl: './video-ad-1.component.css'
})
export class VideoAd1Component {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.el.nativeElement.querySelector('#adContainer');

    // 1. Create the external script element for JuicyAds.
    const script1 = this.renderer.createElement('script');
    script1.type = 'text/javascript';
    script1.async = true;
    script1.setAttribute('data-cfasync', 'false');
    script1.src = 'https://poweredby.jads.co/js/jads.js';
    this.renderer.appendChild(container, script1);

    // 2. Create the <ins> element that will hold the ad.
    const insElement = this.renderer.createElement('ins');
    insElement.id = '1080533';
    insElement.setAttribute('data-width', '308');
    insElement.setAttribute('data-height', '286');
    this.renderer.appendChild(container, insElement);

    // 3. Create the inline script element to initialize the ad.
    const script2 = this.renderer.createElement('script');
    script2.type = 'text/javascript';
    script2.async = true;
    script2.setAttribute('data-cfasync', 'false');
    // Inline script to push the ad zone to JuicyAds.
    script2.text = "(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1080533});";
    this.renderer.appendChild(container, script2);
  }
}
