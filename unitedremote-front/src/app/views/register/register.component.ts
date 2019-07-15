import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../../Services/auth/auth.service';
import { SignUpInfo } from '../../Services/auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  errorMessage = "";
  isLoginFailed = false;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isLoginFailed = false;
        this.route.navigate(["/login"]);
      },
      error => {
        this.isLoginFailed = true;
        this.errorMessage = error.error.message;
      }
    );
  }
}
