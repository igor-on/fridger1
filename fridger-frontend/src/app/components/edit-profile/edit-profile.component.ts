import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
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

  constructor(
    private tfb: TemplateFormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initTemplateForm();
  }

  initTemplateForm() {
    this.fields = this.tfb.fields({
      firstName: this.tfb.text({
        params: {
          label: 'First Name',
        },
        validators: [Validators.required, Validators.maxLength(55)],
      }),
      lastName: this.tfb.text({
        params: {
          label: 'Last Name',
        },
        validators: [Validators.required, Validators.maxLength(55)],
      }),
      username: this.tfb.text({
        params: {
          label: 'Username',
        },
        validators: [Validators.required, Validators.maxLength(55)],
      }),
      email: this.tfb.text({
        params: {
          label: 'Email',
        },
        validators: [Validators.required, Validators.email],
      }),
    });
  }
}
