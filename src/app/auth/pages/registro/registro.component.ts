import { ValidatorService } from './../../../shared/validator/validator.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nombreApellidoPattern,emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.pattern(nombreApellidoPattern)]],
    email: ['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidaor]],
    username: ['',[Validators.required, this.validatorService.noPuedeSerStrider] ],
    password: ['',[Validators.required, Validators.minLength(6) ] ],
    password2: ['',[Validators.required] ]

  },{
    validators:[ this.validatorService.camposIguales('password','password2')]
  });

  get emailErrorMsg():string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.['required']){
      return 'El email es obligatorio';
    }else if(errors?.['pattern']){
      return 'El valor ingresado no tiene formato de correo'
    }else if(errors?.['emailTomado']){
      return 'El correo ya fue tomado'
    }


    return '';
  }

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private emailValidaor: EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Freddy Caballero',
      email: 'test1@test.com',
      username:'jfcs',
      password:'123456',
      password2: '123456'
    });
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid
           && this.miFormulario.get(campo)?.touched
  }

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();

  }


  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.['required']
  //   && this.miFormulario.get('email')?.touched
  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //   && this.miFormulario.get('email')?.touched
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //   && this.miFormulario.get('email')?.touched
  // }
}
