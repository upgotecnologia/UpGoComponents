import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

/**
 * Representa erros básicos de validação para campos de texto.
 */
type SimpleTextError = {
  required?: true;
};

/**
 * Componente reutilizável de campo de data baseado no Angular Material.
 *
 * ## 📌 Funcionalidades
 * - Integração com Reactive Forms
 * - Seleção de data via Datepicker
 * - Suporte a desabilitar campo
 * - Exibição automática de mensagens de erro
 *
 * ## 📥 Inputs
 *
 * | Nome         | Tipo        | Obrigatório | Descrição |
 * |--------------|------------|------------|----------|
 * | `form`       | FormGroup  | ✔️ Sim     | Formulário reativo que contém o controle |
 * | `controlName`| string     | ✔️ Sim     | Nome do FormControl dentro do FormGroup |
 * | `label`      | string     | ❌ Não     | Label exibida acima do campo |
 * | `placeholder`| string     | ❌ Não     | Placeholder do input (fallback: usa label) |
 * | `disabled`   | boolean    | ❌ Não     | Define se o campo estará desabilitado |
 *
 * ## 💡 Exemplo de uso
 *
 * ```html
 * <app-date-field
 *   [form]="form"
 *   controlName="birthDate"
 *   label="Data de nascimento"
 *   placeholder="Selecione uma data"
 * />
 * ```
 */
@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './date-field.html',
  styleUrl: './date-field.scss',
})
export class DateFieldComponent {
  /**
   * Formulário reativo que contém o controle
   */
  @Input() form!: FormGroup;

  /**
   * Nome do FormControl dentro do FormGroup
   */
  @Input() controlName!: string;

  /**
   * Label exibida acima do campo
   */
  @Input() label = '';

  /**
   * Placeholder do input
   */
  @Input() placeholder = '';

  /**
   * Define se o campo estará desabilitado
   */
  @Input() disabled = false;

  /**
   * Retorna a mensagem de erro baseada nas validações do FormControl.
   *
   * 🔹 Regras:
   * - required → "Este campo é obrigatório"
   * - fallback → "Valor inválido"
   *
   * @returns string | null
   */
  getErrorMessage(): string | null {
    const control = this.form.get(this.controlName);

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return null;
    }

    const errors = control.errors as SimpleTextError & Record<string, unknown>;

    if (errors['required']) {
      return 'Este campo é obrigatório';
    }

    return 'Valor inválido';
  }
}