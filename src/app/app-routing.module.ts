import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { VideoComponent } from "./components/video/video.component";

const routes: Routes = [
    { path: 'home/:page', component: HomepageComponent, runGuardsAndResolvers: 'always' },
    { path: 'video/:id', component: VideoComponent }, 
    { path: '**', redirectTo: 'home/1' },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
  
  