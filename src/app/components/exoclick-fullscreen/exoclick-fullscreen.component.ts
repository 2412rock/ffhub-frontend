
import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-exoclick-fullscreen',
  templateUrl: './exoclick-fullscreen.component.html',
  styleUrl: './exoclick-fullscreen.component.css'
})
export class ExoclickFullscreenComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    console.log("full screen loaded")
    const container = this.el.nativeElement.querySelector('#adContainer');

    // 1. Create the external script element for the ad provider.
    const script = this.renderer.createElement('script');
    script.async = true;
    script.type = 'application/javascript';
    script.src = 'https://a.pemsrv.com/ad-provider.js';
    this.renderer.appendChild(container, script);

    // 2. Create the <ins> element for the ad.
    const insElement = this.renderer.createElement('ins');
    insElement.className = 'eas6a97888e35'; // Use appropriate class or id
    insElement.setAttribute('data-zoneid', '5549614');
    this.renderer.appendChild(container, insElement);

    // 3. Create the inline script to initialize the ad.
    const initScript = this.renderer.createElement('script');
    initScript.type = 'application/javascript';
    initScript.text = '(AdProvider = window.AdProvider || []).push({"serve": {}});';
    this.renderer.appendChild(container, initScript);
  }
}
