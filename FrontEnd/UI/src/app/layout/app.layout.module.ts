import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from "primeng/autocomplete";
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppLayoutComponent } from "./app.layout.component";
import { UserService } from "../service/user.service";
import { MenuService } from "../service/menu.service";
import { DialogModule } from 'primeng/dialog';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
    declarations: [
        AppTopBarComponent,
        AppFooterComponent,
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        AutoCompleteModule,
        BrowserModule,
        HttpClientModule,
        DialogModule,
        TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
            deps: [HttpClient]
        }
        })
    ],
    providers: [ UserService, MenuService],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
