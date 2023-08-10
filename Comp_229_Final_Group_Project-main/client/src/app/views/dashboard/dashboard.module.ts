import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/providers/auth.guard';

const routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(routes), CommonModule, MaterialModule],
})
export class DashboardModule {}
