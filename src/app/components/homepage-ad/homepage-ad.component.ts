import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-homepage-ad',
  templateUrl: './homepage-ad.component.html',
  styleUrl: './homepage-ad.component.css'
})
export class HomepageAdComponent implements OnInit {
  ngOnInit(): void {
    console.log("loaded video add")
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // 1. Create the first script element to load the external script.
    const script1 = this.renderer.createElement('script');
    script1.type = 'text/javascript';
    script1.async = true;
    script1.setAttribute('data-cfasync', 'false');
    script1.src = 'https://poweredby.jads.co/js/jads.js';
    this.renderer.appendChild(this.el.nativeElement.querySelector('#adContainer'), script1);

    // 2. Create the <ins> element where the ad will display.
    const insElement = this.renderer.createElement('ins');
    insElement.id = '1080396';
    insElement.setAttribute('data-width', '133');
    insElement.setAttribute('data-height', '139');
    this.renderer.appendChild(this.el.nativeElement.querySelector('#adContainer'), insElement);

    // 3. Create the inline script to push the ad.
    const script2 = this.renderer.createElement('script');
    script2.type = 'text/javascript';
    script2.async = true;
    script2.setAttribute('data-cfasync', 'false');
    const inlineScript = "(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1080396});";
    script2.text = inlineScript;
    this.renderer.appendChild(this.el.nativeElement.querySelector('#adContainer'), script2);
  }

}
