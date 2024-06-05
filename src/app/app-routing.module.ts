import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./EduSchoolBackOffice/Components/Dashboards/dashboard/dashboard.component";
import {HomePageComponent} from "./EduSchoolFrontOffice/Components/home-page/home-page.component";
import { DashboardEnseignantComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-enseignant/dashboard-enseignant.component';
import { GereRdvComponent } from './EduSchoolBackOffice/Components/RDV/gere-rdv/gere-rdv.component';
import { DashboardEleveComponent } from './EduSchoolBackOffice/Components/Dashboards/dashboard-eleve/dashboard-eleve.component';

import { ListClasseComponent } from './EduSchoolBackOffice/Components/gestionPedagogique/classe/list-classe/list-classe.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './EduSchoolBackOffice/Components/Dashboards/user-list/user-list.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {path:"DashboardEnseignant",component:DashboardEnseignantComponent},
  {
    path: 'Dashboard',
    component: DashboardComponent,
    children: [
      { path: 'rdv', component: GereRdvComponent }
    ]
  },
  {path:"Login",component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
