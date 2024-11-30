import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ILogin} from './ILogin';
import {EntranceService, LoginResponse, ILoginResponse} from '../service/EntranceService';
import {Router} from '@angular/router';
import {StorageService, StorageType} from '../../shared/service/StorageService';
import {MessageService} from '../service/MessageService';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  imports: [FormsModule]
})
export class Login {
  formData: ILogin = {username: "", password: ""};

  public constructor(private service: EntranceService,
                     private router: Router,
                     private storage: StorageService,
                     private messageService: MessageService) {}

  handleSubmit() {
    this.service.login(this.formData).subscribe({
      next: response => {
        console.log(response);

        if (this.isLoginResponse(response)) {
          this.storage.set(StorageType.REFRESH_TOKEN, response.token);
          this.storage.set(StorageType.JWT_TOKEN, response.refreshToken);

          this.messageService.changeMessage("Login Successful");
          this.router.navigate(['/']).then();
          return;
        }

        console.log("Unexpected response.");
      },
      error: errorResponse => {
        let errorMessage = errorResponse.error!;
        console.log(errorMessage);
        this.messageService.changeMessage(errorMessage);
      }
    });
  }

  private isLoginResponse(response: LoginResponse): response is ILoginResponse {
    return (response as ILoginResponse).token !== undefined;
  }
}
