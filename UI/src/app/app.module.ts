import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';

import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from "primeng/dropdown";
import { SidebarModule } from 'primeng/sidebar';
import { DragDropModule } from 'primeng/dragdrop';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { KnobModule } from 'primeng/knob';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';

import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { HeadersInterceptor } from '../app/interceptor/headers.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CheckboxModule } from 'primeng/checkbox';
import { NgxPermissionsModule } from 'ngx-permissions';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TabViewModule, 
        FileUploadModule, 
        FormsModule, 
        ColorPickerModule,
        InputTextModule,
        TableModule,
        ToggleButtonModule,
        AccordionModule,
        InputSwitchModule,
        ToastModule,
        BrowserModule,
        HttpClientModule,
        ToolbarModule,
        DialogModule,
        DropdownModule,
        SidebarModule,
        CheckboxModule,
        DragDropModule,
        OverlayPanelModule,
        BadgeModule,
        RadioButtonModule,
        ConfirmDialogModule,
        TagModule,
        ProgressBarModule,
        KnobModule,
        BlockUIModule,
        PanelModule,
        NgxPermissionsModule.forRoot(),
        TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
            deps: [HttpClient]
        }
        })
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true  }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }