import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {AdminPlaceComponent} from './admin-place/admin-place.component';
import {OwnerPlaceComponent} from './owner-place/owner-place.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RoomComponent} from './room/room.component';
import {HotelComponent} from './hotel/hotel.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'admin-place', component: AdminPlaceComponent},
  {path: 'owner-place', component: OwnerPlaceComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'room', component: RoomComponent},
  {path: 'hotel', component: HotelComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
