import { ClasseServiceService } from '../../service/ClasseService/classe-service.service';
import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from 'src/app/EduSchoolBackOffice/Tools/TableColumn';

@Component({
  selector: 'app-list-classe',
  templateUrl: './list-classe.component.html',
  styleUrls: ['./list-classe.component.css']
})
export class ListClasseComponent {


  classes: any;
  classe: any;
  classesTableColumns: TableColumn[] = [];

  constructor(
    private classeService:ClasseServiceService,
    private activatedroute: ActivatedRoute,
    private router: Router,
   ) { }

   ngOnInit(): void {
    this.initializeColumns();
     this.classeService.getclasses().subscribe(
      (data) => {
        console.log(data);
        this.classes = data;

      });

  }
  initializeColumns(): void {
    this.classesTableColumns = [
      {
        name: 'Nom',
        dataKey: 'nom',
        dataKeySimple: '',

        position: 'left',
        isSortable: true
      },
      {
        name: 'Niveau',
        dataKey: 'niveau',
        dataKeySimple: '',

        position: 'left',
        isSortable: false
      },




    ];
  }


  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.classes = this.classes.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.classes = this.classes.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    }
    else  this.classes = this.classes.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));

  }




  editerClasse(classe : any){
    localStorage.setItem('classe', JSON.stringify(classe));
    this.router.navigate(['Dashboard/update-classe']);
  }

  detailClasse(classe: any) {
    localStorage.setItem('classe', JSON.stringify(classe));
    this.router.navigate(['Dashboard/detail-classe']);


    }

  deleteClasse(classe : any){
    this.classeService.deleteclasse(classe.id).subscribe(
      (data) =>{
        this.classes = this.classes.filter((item: { id: any; }) => item.id !==classe.id);

      }
    )
  }

}
