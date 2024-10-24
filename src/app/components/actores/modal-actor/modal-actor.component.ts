import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActorService } from '../../../services/actor.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Actor } from '../../../interfaces/actor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-modal-actor',
  templateUrl: './modal-actor.component.html',
  styleUrl: './modal-actor.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalActorComponent {
  actorForm!: FormGroup;
  accionTitle: string = 'Agregar';
  accionButton: string = 'Guardar';

  constructor(private _formBuilder: FormBuilder, private _actorService: ActorService,
    private modalActual: MatDialogRef<ModalActorComponent>, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public actordata: Actor,
  ){
    if(this.actordata != null){
      this.accionTitle = 'Editar';
      this.accionButton = 'Actualizar';
    }
  }

  ngOnInit(): void {
    this.actorForm = this.initForm();
    if(this.actordata != null){
      this.setDatos();
    }
  }
  
  initForm(): FormGroup{
    return this._formBuilder.group({
      employee_id: ['', [Validators.required, Validators.maxLength(6)]],
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      hire_date: ['', [Validators.required]],
      job_id: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      commission_pct: [''],
      manager_id: [''],
      department_id: ['']     
    });
  }
  
  setDatos(){
    // Convertir las fechas a formato Date
    
    this.actorForm.patchValue({
      employee_id: this.actordata.employee_id, // Manteniendo actordata
      first_name: this.actordata.first_name,
      last_name: this.actordata.last_name,
      email: this.actordata.email,
      phone_number: this.actordata.phone_number,
      hire_date: new Date(this.actordata.hire_date),
      job_id: this.actordata.job_id,
      salary: this.actordata.salary,
      commission_pct: this.actordata.commission_pct,
      manager_id: this.actordata.manager_id,
      department_id: this.actordata.department_id
    });
  }

  guardarActor(){
    const employeeid: number = this.actorForm.value.employee_id;
    const department: number = this.actorForm.value.department_id;
    const manager: number = this.actorForm.value.manager_id;
    
    const _actor: Actor = {
      employee_id: this.actordata == null ? employeeid : employeeid, // Mantener actorForm
      first_name: this.actorForm.value.first_name,
      last_name: this.actorForm.value.last_name,
      email: this.actorForm.value.email,
      phone_number: this.actorForm.value.phone_number,
      hire_date: this.actorForm.value.hire_date,
      job_id: this.actorForm.value.job_id,
      salary: this.actorForm.value.salary,
      commission_pct: this.actorForm.value.commission_pct,
      manager_id: manager,
      department_id: department
    }
    if(this.actordata == null){
    console.log(_actor);

      this._actorService.createActor(_actor).subscribe({
        next: () =>{
          this._snackBar.open('Employee registrado con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.modalActual.close("true");
        },
        error: () => {
          this._snackBar.open('Error al registrar el employee', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });      
        }
      });
    }else{
      this._actorService.updateActor(_actor.employee_id, _actor).subscribe({
        next: () =>{
          this._snackBar.open('Employee actualizado con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.modalActual.close("true");
        },
        error: () => {
          this._snackBar.open('Error al actualizar el employee', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });      
        }
      });
    }
  }
}