import {Component, OnInit} from '@angular/core';
import {UserRole} from '../../entity/UserRole';
import {Account} from '../../entity/Account';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {regExpValidator} from '../../directive/regExp-validator.directive';
import {LengthConstant} from '../../constant/LengthContant';
import {MessageConstant} from '../../constant/MessageConstant';
import {Router} from '@angular/router';
import {CredentialData} from '../../entity/CredentialData';
import {AuthService} from '../../service/auth/auth.service';
import {Restangular} from 'ngx-restangular';
import {USER_ROLES} from '../../constant/_user_roles';
import {MessageData} from '../../entity/MessageData';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-account-builder',
  templateUrl: './account-builder.component.html',
  styleUrls: ['./account-builder.component.scss']
})
export class AccountBuilderComponent implements OnInit {

  readonly USERNAME_MIX = LengthConstant.ACCOUNT_NAME_MIN_LENGTH;
  readonly PASSWORD_MIX = LengthConstant.PASSWORD_MIN_LENGTH;
  readonly USERNAME_MAX = LengthConstant.ACCOUNT_NAME_MAX_LENGTH;
  readonly PASSWORD_MAX = LengthConstant.PASSWORD_MAX_LENGTH;
  readonly USERNAME_REG = /^[a-zA-Z0-9]+(?:[_ - @ .]?[a-zA-Z0-9]?)*$/i;
  readonly PASSWORD_REG = /^[a-zA-Z0-9]+(?:[_ - @ .]?[a-zA-Z0-9]?)*$/i;

  roleList: UserRole[] = [];
  selectedUserRole: UserRole;
  firstPassword = '';
  accountForm: FormGroup;

  // message controlling
  showMessageKey = MessageConstant.NONE;
  showMessagePasswordNotMatch = false;
  readonly ERROR = MessageConstant.ERROR;
  readonly SUCCESS = MessageConstant.SUCCESS;

  // mode
  readonly UPDATE = MessageConstant.UPDATE;
  readonly NEW = MessageConstant.NEW;

  mode = MessageConstant.NEW;
  account: Account = new Account();
  credentialData: CredentialData;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private translate: TranslateService,
              private restangular: Restangular) {
  }

  ngOnInit() {
    this.createForm();
    this.getRoles();
    this.credentialData = this.authService.getCredentialData();
  }

  createForm() {
    this.accountForm = this.fb.group({
      'userName': new FormControl(this.account.userName, [
        Validators.required,
        Validators.minLength(this.USERNAME_MIX),
        Validators.maxLength(this.USERNAME_MAX),
        regExpValidator(this.USERNAME_REG)
      ]),
      'userRole': new FormControl(this.account.roleId, [
        Validators.required
      ])

    });

    if (this.NEW === this.mode) {
      const passwordFormGroup = this.fb.group({
        'password': new FormControl(this.account.password, [
          Validators.required,
          Validators.minLength(this.PASSWORD_MIX),
          Validators.maxLength(this.PASSWORD_MAX),
          regExpValidator(this.PASSWORD_REG)
        ]),
        'passwordConfirm': new FormControl('', [
          Validators.required,
          Validators.minLength(this.PASSWORD_MIX),
          Validators.maxLength(this.PASSWORD_MAX),
          regExpValidator(this.PASSWORD_REG)
        ]),
      });
      this.accountForm.addControl('passwords', passwordFormGroup);
    }
  }

  getRoles() {
    this.roleList = USER_ROLES;
  }

  getPasswordValue(event: string) {
    this.firstPassword = event;
  }

  onSelectRole(roleId: number) {
    this.selectedUserRole = this.roleList.find(role => role.id === roleId);
  }

  onSubmit() {
    const accountData = this.prepareDataToSave(this.accountForm.value, this.roleList);
    this.restangular.one('users').customPOST(accountData)
        .subscribe(result => {
          console.log(result);
          if (result) {
            const data = new MessageData();
            // data.title = this.translate.translateString('message.title.success');
            // data.message = this.translate.translateString('message.save.content.success');
            data.showMessage = true;
            data.type = MessageConstant.ALERT_SUCCESS;
            this.router.navigate(['admin/user/list']);
          }
        }, err => {
          this.showMessageKey = this.ERROR;
        });
  }

  get userName() {
    return this.accountForm.get('userName');
  }

  get userRole() {
    return this.accountForm.get('userRole');
  }

  get password() {
    return this.accountForm.get('passwords').get('password');
  }

  get passwordConfirm() {
    return this.accountForm.get('passwords').get('passwordConfirm');
  }

  get passwords() {
    return this.accountForm.get('passwords');
  }

  private prepareDataToSave(formValue: any, roleList: UserRole[]): Account {
    const acc: Account = this.account;
    acc.userName = formValue.userName;
    acc.email = formValue.userName;
    acc.password = this.mode === MessageConstant.NEW ? formValue.passwords.password : '';
    acc.roleId = formValue.userRole;
    acc.userRole = roleList.find(role => role.id === acc.roleId);
    acc.status = 1;
    if (this.mode === this.NEW) {
      acc.createBy = this.credentialData.userName;
    } else if (this.mode === this.UPDATE) {
      acc.updateBy = this.credentialData.userName;
    }
    return acc;
  }

  passwordConfirming(abstractControl: AbstractControl): { invalid: boolean } {
    if (abstractControl.get('password').value !== abstractControl.get('passwordConfirm').value) {
      return {invalid: true};
    }
  }

  onChangeConfirmedPassword(event) {
    const password = this.accountForm.value.passwords.password;
    this.showMessagePasswordNotMatch = password !== event;
  }

  buildTranslateParam(value) {
    return {
      value: value
    };
  }
}
