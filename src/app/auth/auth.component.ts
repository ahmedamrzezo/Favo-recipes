import { Component, OnInit, ViewEncapsulation, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  fields = [];
  submitted = false;
  responseMessage: string;
  isLoading = false;
  hasErrors = false;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  authForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.fields = this.authService.getFormSignUpFields();
  }


  submitForm() {
    console.log(this.authForm);
    this.submitted = true;
    if (this.authForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signUp(this.authForm.value).subscribe(
      res => {
        this.isLoading = false;
        this.hasErrors = false;
        this.responseMessage = 'Signed up successfully';
        this.router.navigate(['/recipes']);
        console.log(res);
      },
      errMsg => {
        this.isLoading = false;
        this.hasErrors = true;
        this.responseMessage = errMsg;
        this.showErrorAlert(errMsg);
      }
    )
  }
  private showErrorAlert(message: string) {
    const alertComp = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    
    const hostAlert = hostViewContainerRef.createComponent(alertComp);

    hostAlert.instance.message = message;
    hostAlert.instance.close.subscribe(() => {
      hostAlert.destroy();
    });
  }
  onHandleError() {
    this.responseMessage = null;
  }
}
