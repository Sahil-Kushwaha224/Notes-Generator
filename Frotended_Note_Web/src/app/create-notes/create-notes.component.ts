import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotesService } from '../services/notes/notes.service';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent {

  isSpinning = false;
  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(200)]],
      description: [null, [Validators.required, Validators.maxLength(500),this.forbiddenCharactersValidator(/[#!$%^():<>"'?.={}~`]/)]],
    });
  }
  
  forbiddenCharactersValidator(allowedChars: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = !allowedChars.test(control.value);
      return isValid ? null : { 'forbiddenChars': { value: control.value } };
    };
  }
  
  
  



  addCategory(): void {
    if (this.categoryForm.valid) {
      this.isSpinning = true;
      this.notesService.createNote(this.categoryForm.value).subscribe((res) => {
        this.isSpinning = false;
        if (res.id != null) {
          this.snackBar.open('Notes Posted Successfully!', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/dashboard');
        } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      }, error => {
        console.log(error)
        this.isSpinning = false;
        this.snackBar.open(error.error, 'Close', {
          duration: 5000
        });
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}


