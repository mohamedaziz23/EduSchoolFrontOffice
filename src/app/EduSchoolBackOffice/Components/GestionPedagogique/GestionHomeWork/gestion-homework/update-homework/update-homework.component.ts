import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Homework } from '../../../entities/homework.entitie';
import { HomeworkService } from '../../../services/homework.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-homework',
  templateUrl: './update-homework.component.html',
  styleUrls: ['./update-homework.component.css']
})
export class UpdateHomeworkComponent implements OnInit {
  homeworkList : Homework[] = [];
  homework : Homework = new Homework();
  homeworkForm !:FormGroup;
  submitted = false;
  classes: any;
  classe:any;
  matieres : any;
  id:any;
  matiere:any;
  constructor(
    private formbuilder: FormBuilder, 
    private homeworkService:HomeworkService,
    private router :Router,
    private route: ActivatedRoute){

    }
 
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.homeworkService.getHomeworkByID(this.id).subscribe(
      (data)=> { 
        this.homework=data; 
        this.classe=this.homework.classeHomework
        this.matiere=this.homework.matiereHomework
      }
    )
    this.homeworkForm = new FormGroup({
      sujet: new FormControl('',Validators.required),
      dateRemise: new FormControl('',Validators.required),
      dateRecu: new FormControl('',Validators.required),
      classeHomework: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      matiereHomework: new FormControl('',Validators.required)
    });
    
    this.homeworkService.getAllMatiere().subscribe(
      (data) => {
        this.matieres = data;
      }
    )
    this.homeworkService.getAllClasse().subscribe(
      (data) => {
          this.classes = data;
      }
    );
  
  }
  UpdateHomework(){
    this.submitted = true;
    if (this.homeworkForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'il faut remplir tous champs ',
        icon: 'error',
        confirmButtonText: 'ok',
        showCancelButton: true
      });
      return; 
    }
  this.homeworkService.updateHomework(this.id,this.homeworkForm.value).subscribe(
    (data) => {
    }
  );
  
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'votre données à été ajouté avec success',
    showConfirmButton: false,
    timer: 1500
  });
  }


}
