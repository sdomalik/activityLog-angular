import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl, FormGroupDirective, NgForm, } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  isLinear = false;
  matcher = new MyErrorStateMatcher();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  registerInfo = '';


  constructor(
    private _formBuilder: FormBuilder,
    public authService: AuthService
    ) { }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('thirdCtrl').value;
  let confirmPass = group.get('fourthCtrl').value;

  return pass === confirmPass ? null : { notSame: true }
}
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      fourthCtrl:['']
    }, {validators: this.checkPasswords});
  }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

