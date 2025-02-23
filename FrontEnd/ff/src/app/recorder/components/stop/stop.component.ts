import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomService } from "../../service/custom.service";

@Component({
    templateUrl: './stop.component.html',
    styleUrls: ['./stop.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class StopComponent {

    constructor(private customService: CustomService ,private confirmationService: ConfirmationService, private messageService: MessageService) { }
    
    csRequest(){
        this.customService.csRequest().subscribe({
            next: (data) => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Config Messages requested' });
            }, error: (e) => {
                console.error("API error in /cs - Data not found" + e);
            }
        });
    }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target || new EventTarget,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.customService.stopServer().subscribe({
                    next: (data) => {
                        console.log(data);
                    }, error: (e) => {
                        console.error("API error in /kill - Data not found" + e);
                    }
                });
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Api Services Stopped!' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }
    
    
 }