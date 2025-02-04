import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsSubject = new BehaviorSubject<any[]>([]);
  students$ = this.studentsSubject.asObservable();
  private studentIndex = 1;

  constructor() {}

  // Add a new student
  addStudent(student: any) {
    const currentStudents = this.studentsSubject.value;
    const newStudent = {_id: this.studentIndex++, ...student} // assign an index
    this.studentsSubject.next([...currentStudents, newStudent]);
  }

  // Update an existing student
  updateStudent(index: number, updatedStudent: any) {
    console.log(index, updatedStudent)
    const currentStudents = this.studentsSubject.value;
    currentStudents[index] = { ...currentStudents[index], ...updatedStudent }; // Preserve unchanged fields
    this.studentsSubject.next([...currentStudents]);
  }

   // Delete an existing student
  deleteStudent(index: number) {
    const currentStudents = this.studentsSubject.value;
    currentStudents.splice(index, 1); // Remove student by index
    this.studentsSubject.next([...currentStudents]);
  }
}
