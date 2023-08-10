import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../pages/about/about.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { LoginComponent } from '../views/auth/login/login.component';
import { RegisterComponent } from '../views/auth/register/register.component';
import { DashboardComponent } from '../views/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, data: { title: 'Home' } },
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  {
    path: 'contactus',
    component: ContactUsComponent,
    data: { title: 'Contact' },
  },
  { path: 'register', component: RegisterComponent, data: { title: 'login' } },
  { path: 'login', component: LoginComponent, data: { title: 'login' } },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
