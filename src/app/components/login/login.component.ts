import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/enviroments/environment';
import { AuthService } from '../../commons/services/auth.service';
const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  hide = true;
  loginForm: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    public authservice: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
    const body = {
      UserName: form.value.userName, Password: form.value.password
    }
    if (form.valid) {
      this.authservice.auth(`${urlBase}`, body).subscribe(
        {
          next: resp => {
            const { user } = resp[0];
            if (user.user === form.value.userName && user.pass === form.value.password) {
              localStorage.setItem('Token', resp.token);
              this.router.navigate(['/', 'dashboard'])
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not found, incorrect username or password!!!', life: 3000 });
            }
          },
          error: err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.status === 404 ? 'User not found, incorrect username or password!!!' : 'Internal server error', life: 3000 });
          }
        });
    }
  }
}


