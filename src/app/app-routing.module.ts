import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { VideoComponent } from "./components/video/video.component";

const routes: Routes = [
    { path: 'home', component: HomepageComponent },
    { path: 'video/:id', component: VideoComponent }, 
    { path: '**', redirectTo: 'home' },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
  
  