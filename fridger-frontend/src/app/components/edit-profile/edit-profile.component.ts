import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { er } from '@fullcalendar/core/internal-common';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import {
  TemplateFormBuilder,
  TemplateFormField,
} from 'src/app/shared/components/dynamic-form/template-form-field';
import { Icon } from 'src/app/shared/icons';
import { UserDTO } from 'src/app/shared/models/user.dto';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MatIconModule, DynamicFormComponent, CommonModule, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  @ViewChild('form') form!: DynamicFormComponent<any>;

  fields!: TemplateFormField[];
  readonly Icon = Icon;

  user!: UserDTO;
  userProfilePicture!: SafeUrl;

  constructor(
    private tfb: TemplateFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.userProfilePicture = this.route.snapshot.data['userProfPic'];

    this.initTemplateForm();
  }

  initTemplateForm() {
    this.fields = this.tfb.fields<UserDTO>({
      username: this.tfb.text({
        value: this.user.username,
        params: {
          label: 'Username',
        },
        readonly: true,
        validators: [Validators.required, Validators.maxLength(55)],
      }),
      firstName: this.tfb.text({
        value: this.user.firstName,
        params: {
          label: 'First Name',
        },
        validators: [Validators.required, Validators.maxLength(55)],
      }),
      lastName: this.tfb.text({
        value: this.user.lastName,
        params: {
          label: 'Last Name',
        },
        validators: [Validators.required, Validators.maxLength(55)],
      }),
      email: this.tfb.text({
        value: this.user.email,
        params: {
          label: 'Email',
        },
        validators: [Validators.required, Validators.email],
      }),
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      this.userService
        .uploadUserProfilePicture(this.user.username, file)
        .subscribe({
          next: (imgUrl: SafeUrl) => {
            this.userProfilePicture = imgUrl;
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }
  }

  onUpdateProfile() {
    console.log(this.form.formGroup.value);

    this.userService.updateUser(this.form.formGroup.getRawValue()).subscribe({
      next: () => {
        this.messageService.sendMessage('Profile updated successfully'),
          this.router.navigate(['/my-account']);
      },
      error: (err: any) => {
        console.error(err);
        this.messageService.sendMessage({
          detail: 'Failed to update profile: ' + err.error.message,
          summary: 'Error',
          severity: 'error',
        });
      },
    });
  }
}
