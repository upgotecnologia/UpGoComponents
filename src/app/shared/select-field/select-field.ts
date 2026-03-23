import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/**
 * Tipagem para a lista de opções do Select.
 */
export type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

/**
 * Representa erros básicos de validação para campos de seleção.
 */
type SimpleSelectError = {
  required?: true;
};

/**
 * Componente reutilizável de campo de seleção (Select) baseado no Angular Material.
 *
 * ## 📌 Funcionalidades
 * - Integração com Reactive Forms
 * - Suporte a lista dinâmica de opções
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
 * | `placeholder`| string           | ❌ Não     | Placeholder do select |
 * | `disabled`   | boolean          | ❌ Não     | Define se o campo estará desabilitado |
 * | `options`    | SelectOption[]   | ✔️ Sim     | Lista de opções do select |
 * | `prefixIcon` | string           | ❌ Não     | Ícone exibido no início do campo |
 * | `suffixIcon` | string           | ❌ Não     | Ícone exibido no final do campo |
 *
 * ## 💡 Exemplo de uso
 *
 * ```html
 * <app-select-field
 *   [form]="form"
 *   controlName="status"
 *   label="Status"
 *   placeholder="Selecione um status"
 *   [options]="[
 *     { label: 'Ativo', value: 'active' },
 *     { label: 'Inativo', value: 'inactive' }
 *   ]"
 *   prefixIcon="list"
 * />
 * ```
 */
@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './select-field.html',
  styleUrls: ['./select-field.scss'],
})
export class SelectFieldComponent {
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
   * Placeholder do select
   */
  @Input() placeholder = '';

  /**
   * Define se o campo estará desabilitado
   */
  @Input() disabled = false;

  /**
   * Lista de opções exibidas no select
   */
  @Input() options: SelectOption[] = [];

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
   * - fallback → "Valor inválido"
   *
   * @returns string | null
   */
  getErrorMessage(): string | null {
    const control = this.form.get(this.controlName);

    // Se não existir controle ou não houver erro, não mostra mensagem
    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return null;
    }

    const errors = control.errors as SimpleSelectError & Record<string, unknown>;

    // Campo obrigatório
    if (errors['required']) {
      return 'Este campo é obrigatório';
    }

    // Erro genérico
    return 'Valor inválido';
  }
}