import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: AuthComponent},
      { path: 'login', component: LoginComponent }
    ]),
    ReactiveFormsModule,
    SharedModule
  ]
})

export class AuthModule {}