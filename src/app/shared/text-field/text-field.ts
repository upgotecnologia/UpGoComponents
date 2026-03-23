import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';

/**
 * Componente reutilizável de campo de texto baseado no Angular Material.
 *
 * ## 📌 Funcionalidades
 * - Integração com Reactive Forms
 * - Suporte a máscaras (ngx-mask)
 * - Ícones prefixo e sufixo
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
 * | `mask`       | string     | ❌ Não     | Máscara do campo (ex: CPF) |
 * | `prefixIcon` | string     | ❌ Não     | Ícone exibido no início do campo |
 * | `suffixIcon` | string     | ❌ Não     | Ícone exibido no final do campo |
 *
 * ## 💡 Exemplo de uso
 *
 * ```html
 * <app-text-field
 *   [form]="form"
 *   controlName="cpf"
 *   label="CPF"
 *   placeholder="Digite seu CPF"
 *   [mask]="'000.000.000-00'"
 *   prefixIcon="person"
 * />
 * ```
 */
@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective,
  ],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class TextFieldComponent {
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
   * Máscara do campo (ex: '000.000.000-00' para CPF)
   */
  @Input() mask?: string;

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
   * - minlength → "Mínimo de X caracteres"
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

    // Campo obrigatório
    if (control.errors['required']) {
      return 'Este campo é obrigatório';
    }

    // Validação de tamanho mínimo
    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Mínimo de ${requiredLength} caracteres`;
    }

    // Erro genérico
    return 'Valor inválido';
  }
}