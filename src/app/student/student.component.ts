import { AddComponent } from './add/add.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../services/student.service';
import { EditComponent } from './edit/edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'fullName', 'email', 'gender', 'mobile', 'department', 'address', 'actions'];
  // dataSource = new MatTableDataSource<Student>([
  //   { rollNo: 1, name: 'John Deo', email: 'test@email.com', gender: 'male', mobile: '1234567890', department: 'Mathematics', address: '123 Main St' },
  //   { rollNo: 2, name: 'Sarah Smith', email: 'test@email.com', gender: 'female', mobile: '1234567890', department: 'Civil', address: '456 Elm St' },
  //   { rollNo: 3, name: 'Jay Soni', email: 'test@email.com', gender: 'female', mobile: '1234567890', department: 'Civil', address: '321 Oak St' },
  //   { rollNo: 4, name: 'Smita Parikh', email: 'test@email.com', gender: 'female', mobile: '1234567890', department: 'Science', address: '654 Maple St' },
  //   { rollNo: 5, name: 'Pankaj Sinha', email: 'test@email.com', gender: 'male', mobile: '1234567890', department: 'Computer', address: '159 Cedar St' },
  // ]);
  dataSource = new MatTableDataSource([{}]);
  emptyData = new MatTableDataSource([{ empty: "row" }]);

  constructor(
    private dialog: MatDialog, 
    private studentService: StudentService,
    private snackBar: MatSnackBar
  ) {
 
  }

  ngOnInit() {
    this.studentService.students$.subscribe(students => {
      console.log(students, this.dataSource.data.length)
      this.dataSource = new MatTableDataSource(
        students
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Add Student Dialog
  addStudent(){
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe(newStudent => {
      if (newStudent) {
        this.studentService.addStudent(newStudent);
      }
    });
  }

  // Edit Student Dialog
  editStudent(student: any, index:number) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {student, index} // Pass student data to dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.updateStudent(result.index, result.student);
      }
    });  
  }

  // Delete Stident Dialog
    deleteStudent(index: number, student: any) {
      const fullName = `${student.firstName} ${student.lastName}`;
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '400px',
        data: { fullName }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.studentService.deleteStudent(index);
          this.showSnackbar(`${fullName} has been deleted.`);
        }
      });  
    }
    showSnackbar(message: string) {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
 
}
