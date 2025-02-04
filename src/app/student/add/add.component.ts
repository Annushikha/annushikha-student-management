import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  studentForm: FormGroup;
  departments = ['Computer Engg.', 'Mechanical', 'Civil', 'Electrical', 'Electronics'];
  subjects: string[] = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 'Geography', 'English', 'Economics'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>
  ) {
    this.studentForm = this.fb.group({
      firstName: ['',  Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: ['',  Validators.compose([Validators.required, Validators.minLength(3)])],
      gender: ['male', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mobile: ['', Validators.compose([Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      department: ['', Validators.required],
      address: [''],
      subjects: [''],
      agree: [false, Validators.requiredTrue],
    });
    
  }

  ngOnInit(){
    
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.dialogRef.close(this.studentForm.value); // Send form data back     
      this.studentForm.reset();
    }
  }
 

}
