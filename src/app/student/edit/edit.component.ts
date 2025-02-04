import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editStudentForm: FormGroup;
  departments = ['Computer Engg.', 'Mechanical', 'Civil', 'Electrical', 'Electronics'];
  subjects: string[] = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 'Geography', 'English', 'Economics'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.editStudentForm = this.fb.group({
      firstName: [data?.student?.firstName || '',  Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: [data?.student?.lastName || '',  Validators.compose([Validators.required, Validators.minLength(3)])],
      gender: [data?.student?.gender || 'male', Validators.required],
      email: [data?.student?.email || '', Validators.compose([Validators.required, Validators.email])],
      mobile: [data?.student?.mobile || '', Validators.compose([Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      department: [data?.student?.department || '', Validators.required],
      address: [data?.student?.address || ''],
      subjects: [data?.student?.subjects || ''],
    });
    
  }

  ngOnInit(){
    
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.editStudentForm.valid) {
      this.dialogRef.close({ student: this.editStudentForm.value, index: this.data.index });
    }
  }

}
