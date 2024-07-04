import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessageService as PrimengMessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [PrimengMessageService],
})
export class LoginComponent {
  username = new FormControl<string>('', Validators.required);
  password = new FormControl<string>('', Validators.required);

  constructor(
    private authService: AuthService,
    private primengMessageService: PrimengMessageService
  ) {}

  onSignIn() {
    console.log(this.username.value);
    console.log(this.password.value);

    this.authService.login(this.username.value!, this.password.value!);
  }

  ngOnInit(): void {}
}
