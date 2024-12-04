import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CustomService } from "../../service/custom.service";


@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    public hdData: any;
    public msgData: any;
    public DatabaseInfo?: any = ['r','s', 't', 'p'];
    public DatabaseAndTablesSize?: any;
    public myHardDisk?: number;

    loading = 0;
    pieOptions: any;
    subscription!: Subscription;
   
    constructor(public customService: CustomService, public layoutService: LayoutService) { }

    ngOnInit() {
        this.getDataMsg();
        this.getDataHd();
    }

    getDataHd(){
        this.customService.getHd().subscribe({
            next: (data) => {                
                this.DatabaseAndTablesSize = data;
                //this.myHardDisk = Math.floor(this.DatabaseAndTablesSize.totalSpace);
                this.myHardDisk = this.DatabaseAndTablesSize.totalSpace;
                this.chartHd(this.DatabaseAndTablesSize);
            }, error: (e) => {
                console.error("API error in /getDataHd - Data not found" + e);
            }
        });
    }

    getDataMsg(){
        this.customService.getCount().subscribe({
            next: (data) => {
                this.DatabaseInfo = data;
                this.chartMsg(data);
            }, error: (e) => {
                console.error("API error in /getDataMsg - Data not found" + e);
            }
        });
    }

    chartHd(data:any){
        const documentStyle = getComputedStyle(document.documentElement);

        this.hdData = {
            labels: ['Free GB', 'Used GB'],
            datasets: [
                {
                    data: [data.spaceFree, data.spaceUsed],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--cyan-500'),
                        documentStyle.getPropertyValue('--pink-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--cyan-400'),
                        documentStyle.getPropertyValue('--pink-400')
                    ]
                }]
        };
    }

    chartMsg(data:any) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.msgData = {
            labels: ['R', 'T', 'P', 'S', 'C', 'B'],
            datasets: [
                {
                    data: [data['r'], data['t'], data['p'], data['s'], data['c'], data['b']],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--pink-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                        documentStyle.getPropertyValue('--orange-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--pink-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
