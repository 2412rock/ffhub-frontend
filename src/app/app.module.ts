import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomepageComponent } from "./components/homepage/homepage.component";
import { RouterModule } from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field'; // Form field for search
import { MatInputModule } from '@angular/material/input'; // Input field
import { MatIconModule } from '@angular/material/icon'; // Search icon
import { MatButtonModule } from '@angular/material/button'; // Search button
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false, //keeps the user signed in
                providers: [

                ]
            }
        },

    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatGridListModule,
        MatToolbarModule,
        RouterModule.forRoot([]),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatChipsModule

    ]
})
export class AppModule { }