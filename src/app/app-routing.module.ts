import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/admin/hotels/hotels.component';

import { UsersComponent } from './components/admin/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { ControlPanelComponent } from './components/hotelAdmin/control-panel/control-panel.component';
import { LoginComponent } from './components/login/login.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';

import { AdminGuard } from './guards/admin.guard';
import { HotelAdminGuard } from './guards/hotel-admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myProfile', component: MyProfileComponent },
  {
    path: 'controlPanelHotels',
    canActivate: [HotelAdminGuard],
    component: ControlPanelComponent,
  },
  { path: 'admin/users', canActivate: [AdminGuard], component: UsersComponent },
  {
    path: 'admin/hotels',
    canActivate: [AdminGuard],
    component: HotelsComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
