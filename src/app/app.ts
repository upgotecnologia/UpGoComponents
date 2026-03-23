import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './shared/text-field/text-field';
import { NumberFieldComponent } from './shared/number-field/number-field';
import { PasswordFieldComponent } from './shared/password-field/password-field';
import { SearchFieldComponent } from './shared/search-field/search-field';
import { SelectFieldComponent, type SelectOption } from './shared/select-field/select-field';
import { TextFieldAreaComponent } from './shared/text-field-area/text-field-area';
import { DateFieldComponent } from './shared/date-field/date-field';
import { TimeFieldComponent } from './shared/time-field/time-field';
import { TableComponent } from './shared/table/table';
import { TablePaginatedComponent } from './shared/table-paginated/table-paginated';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFieldComponent,
    NumberFieldComponent,
    PasswordFieldComponent,
    SearchFieldComponent,
    SelectFieldComponent,
    TextFieldAreaComponent,
    DateFieldComponent,
    TimeFieldComponent,
    TableComponent,
    TablePaginatedComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  roleOptions: SelectOption[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Usuário', value: 'user' },
    { label: 'Convidado', value: 'guest', disabled: false },
  ];

  tableColumns = [
    { key: 'fullName', label: 'Nome' },
    { key: 'cpf', label: 'CPF' },
    { key: 'age', label: 'Idade' },
    {
      key: 'role',
      label: 'Perfil',
      formatter: (row: any) => {
        const map: Record<string, string> = {
          admin: 'Admin',
          user: 'Usuário',
          guest: 'Convidado'
        };
        return map[row.role] || row.role;
      }
    }
  ];
  
  tableData: any[] = [
    {
      fullName: 'João Silva',
      cpf: '123.456.789-00',
      age: 25,
      role: 'admin'
    },
    {
      fullName: 'Maria Souza',
      cpf: '987.654.321-00',
      age: 30,
      role: 'user'
    },
    {
      fullName: 'Carlos Lima',
      cpf: '111.222.333-44',
      age: 22,
      role: 'guest'
    }
  ];

  form = new FormGroup({
    fullName: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    cpf: new FormControl<string>('', [Validators.required]),
    age: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    search: new FormControl<string>('', [Validators.required]),
    role: new FormControl<string>('', [Validators.required]),
    about: new FormControl<string>('', [Validators.required, Validators.minLength(10)]),

    date: new FormControl<Date | null>(null, [Validators.required]),
    time: new FormControl<Date | null>(null, [Validators.required]),
  });

  submit() {
    if (this.form.valid) {
      const data = this.form.value;
      console.log('Form:', data);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
