import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-homepage-tile-ad-2',
  templateUrl: './homepage-tile-ad-2.component.html',
  styleUrl: './homepage-tile-ad-2.component.css'
})
export class HomepageTileAd2Component implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // 1. Load the external JuicyAds script.
    const script1 = this.renderer.createElement('script');
    script1.type = 'text/javascript';
    script1.async = true;
    script1.setAttribute('data-cfasync', 'false');
    script1.src = 'https://poweredby.jads.co/js/jads.js';
    this.renderer.appendChild(this.el.nativeElement.querySelector('#adContainer'), script1);

    // 2. Create the <ins> element for the ad with the updated ad zone parameters.
    const insElement = this.renderer.createElement('ins');
    insElement.id = '1080527';
    insElement.setAttribute('data-width', '250');
    insElement.setAttribute('data-height', '250');
    this.renderer.appendChild(this.el.nativeElement.querySelector('#adContainer'), insElement);

    // 3. Create and append the inline script to initialize the ad.
    const script2 = this.renderer.createElement('script');
    script2.type = 'text/javascript';
    script2.async = true;
    script2.setAttribute('data-cfasync', 'false');
    script2.text = "(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1080527});";
    this.renderer.appendChild(this.el.nativeElement.querySelector('#adContainer'), script2);
  }
  
}
