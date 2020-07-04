import { BloodBankService } from './../../services/blood-bank.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-blood-bank-branch',
  templateUrl: './blood-bank-branch.component.html',
  styleUrls: ['./blood-bank-branch.component.css']
})
export class BloodBankBranchComponent implements OnInit {

  form: FormGroup;
  BloodBank = [];
  @Output() addBranch = new EventEmitter<any>();
  constructor(private adminBloodBankService: BloodBankService, private fb: FormBuilder) { }

  ngOnInit() {
    this.adminBloodBankService.getbloodBankbranch()
    .subscribe((result) => {
      //(result.data);
      this.BloodBank.push(result.data);
      //(this.BloodBank);
    });
    this.form = this.fb.group({
      branchName: new FormControl('', Validators.required),
    });
  }

  branch() {
    this.addBranch.emit(this.form.controls.branchName.value);
  }

}
