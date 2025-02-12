import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-homepage-bottom-ad',
  templateUrl: './homepage-bottom-ad.component.html',
  styleUrl: './homepage-bottom-ad.component.css'
})
export class HomepageBottomAdComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    const container = this.el.nativeElement.querySelector('#adContainer');

    // 1. Load the external JuicyAds script.
    const script1 = this.renderer.createElement('script');
    script1.type = 'text/javascript';
    script1.async = true;
    script1.setAttribute('data-cfasync', 'false');
    script1.src = 'https://poweredby.jads.co/js/jads.js';
    this.renderer.appendChild(container, script1);

    // 2. Create the <ins> element for the ad with the new ad zone parameters.
    const insElement = this.renderer.createElement('ins');
    insElement.id = '1080528';
    insElement.setAttribute('data-width', '474');
    insElement.setAttribute('data-height', '190');
    this.renderer.appendChild(container, insElement);

    // 3. Create and append the inline script to initialize the ad.
    const script2 = this.renderer.createElement('script');
    script2.type = 'text/javascript';
    script2.async = true;
    script2.setAttribute('data-cfasync', 'false');
    const inlineScript = "(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1080528});";
    script2.text = inlineScript;
    this.renderer.appendChild(container, script2);
  }
}
