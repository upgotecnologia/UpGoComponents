import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * Representa erros básicos de validação para campos de texto.
 */
type SimpleError = {
  required?: true;
  min?: { min: number; actual: number };
  max?: { max: number; actual: number };
};

/**
 * Componente reutilizável de campo numérico baseado no Angular Material.
 *
 * ## 📌 Funcionalidades
 * - Integração com Reactive Forms
 * - Suporte a valores mínimos e máximos
 * - Controle de incremento (step)
 * - Ícones prefixo e sufixo
 * - Exibição automática de mensagens de erro
 *
 * ## 📥 Inputs
 *
 * | Nome         | Tipo              | Obrigatório | Descrição |
 * |--------------|------------------|------------|----------|
 * | `form`       | FormGroup        | ✔️ Sim     | Formulário reativo que contém o controle |
 * | `controlName`| string           | ✔️ Sim     | Nome do FormControl dentro do FormGroup |
 * | `label`      | string           | ❌ Não     | Label exibida acima do campo |
 * | `placeholder`| string           | ❌ Não     | Placeholder do input (fallback: usa label) |
 * | `disabled`   | boolean          | ❌ Não     | Define se o campo estará desabilitado |
 * | `min`        | number \| null   | ❌ Não     | Valor mínimo permitido |
 * | `max`        | number \| null   | ❌ Não     | Valor máximo permitido |
 * | `step`       | number \| null   | ❌ Não     | Incremento do campo numérico |
 * | `prefixIcon` | string           | ❌ Não     | Ícone exibido no início do campo |
 * | `suffixIcon` | string           | ❌ Não     | Ícone exibido no final do campo |
 *
 * ## 💡 Exemplo de uso
 *
 * ```html
 * <app-number-field
 *   [form]="form"
 *   controlName="age"
 *   label="Idade"
 *   placeholder="Digite sua idade"
 *   [min]="0"
 *   [max]="120"
 *   [step]="1"
 *   prefixIcon="tag"
 * />
 * ```
 */
@Component({
  selector: 'app-number-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './number-field.html',
  styleUrl: './number-field.scss',
})
export class NumberFieldComponent {
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
   * Valor mínimo permitido
   */
  @Input() min: number | null = null;

  /**
   * Valor máximo permitido
   */
  @Input() max: number | null = null;

  /**
   * Incremento do campo numérico
   */
  @Input() step: number | null = null;

  /**
   * Ícone exibido no início do campo (prefixo)
   */
  @Input() prefixIcon?: string;

  /**
   * Ícone exibido no final do campo (sufixo)
   */
  @Input() suffixIcon?: string;

  /**
   * Retorna a mensagem de erro baseada nas validações do FormControl.
   *
   * 🔹 Regras:
   * - required → "Este campo é obrigatório"
   * - min → "Valor mínimo é X"
   * - max → "Valor máximo é X"
   * - fallback → "Valor inválido"
   *
   * @returns string | null
   */
  getErrorMessage(): string | null {
    const control = this.form.get(this.controlName);

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return null;
    }

    const errors = control.errors as SimpleError & Record<string, unknown>;

    if (errors['required']) {
      return 'Este campo é obrigatório';
    }

    if (errors['min']) {
      const minValue = (errors['min'] as { min: number }).min;
      return `Valor mínimo é ${minValue}`;
    }

    if (errors['max']) {
      const maxValue = (errors['max'] as { max: number }).max;
      return `Valor máximo é ${maxValue}`;
    }

    return 'Valor inválido';
  }
}