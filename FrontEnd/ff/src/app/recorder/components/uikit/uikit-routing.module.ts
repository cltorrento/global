import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'backup', data: { breadcrumb: 'Backup Layout' }, loadChildren: () => import('./backup/backup.module').then(m => m.BackupModule) },
        { path: 'graphic', data: { breadcrumb: 'Graphic Layout' }, loadChildren: () => import('./graphic/graphic.module').then(m => m.GraphicModule) },
        { path: 'config', data: { breadcrumb: 'Configuration' }, loadChildren: () => import('./config/config.module').then(m => m.ConfigModule) },
        { path: 'modules', data: { breadcrumb: 'Modules' }, loadChildren: () => import('./module/modules.module').then(m => m.ModulesModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
