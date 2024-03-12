import { Component } from '@angular/core';
import { NotesService } from '../services/notes/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private notesService:NotesService){}

  taskData:any;


  ngOnInit(){
    this.getTopNotes();
  }


  getTopNotes(){
    this.notesService.getLatestNotesForUser().subscribe(res =>{
      console.log(res);
      this.taskData = res;
    })
  }

  deleteTask(id: number) {
    console.log(id)
  }
  
}
