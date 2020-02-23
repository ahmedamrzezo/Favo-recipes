import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  fields = [];
  submitted = false;
  responseMessage: string;
  isLoading = false;
  hasErrors = false;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  authForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.fields = this.authService.getLoginFields();
  }

  submitForm() {
    console.log(this.authForm);
    this.submitted = true;
    if (this.authForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.authForm.value).subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        this.hasErrors = false;
        this.responseMessage = 'Login successful';
        this.router.navigate(['/recipes']);
      },
      errMsg => {
        console.log(errMsg);
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
