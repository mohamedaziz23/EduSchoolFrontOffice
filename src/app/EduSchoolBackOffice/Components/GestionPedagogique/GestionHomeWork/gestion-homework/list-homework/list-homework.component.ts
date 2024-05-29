import { Component, OnInit, ViewChild } from '@angular/core';
import { Homework } from '../../../entities/homework.entitie';
import { HomeworkService } from '../../../services/homework.service';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateHomeworkComponent } from '../update-homework/update-homework.component';
import { PopupComponent } from '../../../popup/popup.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-homework',
  templateUrl: './list-homework.component.html',
  styleUrls: ['./list-homework.component.css']
})
export class ListHomeworkComponent implements OnInit{
  listHomework: Homework[] =[];
dataSource: any;
displayedColumns: string[] = ["sujet", "dateRemis", "dateRecu", "Classe", "matiere", "action"];
@ViewChild(MatPaginator) paginatior !: MatPaginator;
@ViewChild(MatSort) sort !: MatSort;
  constructor(
    private homeworkService:HomeworkService, 
    private dialog: MatDialog,
    private router :Router
  ){}
  ngOnInit(): void {
    this.loadHomework();
  
  }

  loadHomework(){
    this.homeworkService.getHomework().subscribe(
       (data) => { 
        this.listHomework = data
        console.log(this.listHomework)
        this.dataSource = new MatTableDataSource<Homework>(this.listHomework.reverse());
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort ;
      }
    )
  }
  deleteHomework(code: any) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.homeworkService.deleteHomework(code).subscribe(
          () => {
            Swal.fire(
              'Supprimé!',
              'Le devoir a été supprimé.',
              'success'
            );
            this.loadHomework();
          },
          (error) => {
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression du devoir.',
              'error'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Le devoir n\'a pas été supprimé',
          'error'
        );
      }
    });
  }
  filterChange(data: Event){
    const value = ( data.target as HTMLInputElement).value;
    this.dataSource.filter = value ;
  }
  editHomework(id: number){
    this.router.navigate(['Dashboard/UpdateHomework',id]);
  }

  detailHomework(code: any){
    this.openPopUp(code, 'Detail du Homework',PopupComponent );
  }
  openPopUp(code:any, titre: any, component: any){
    var _popup = this.dialog.open(component,{
      width: '100%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: titre,
        code: code ,
        type: 'homework'
      }
    });
    _popup.afterClosed().subscribe( 
      item =>
        {
          this.loadHomework();
        }
      
      )
  }
  ajouterHomework(){
    this.router.navigate(['Dashboard/GestionHomeWork']);
  }
  
}
