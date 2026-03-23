import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * Representa erros básicos de validação para campos de texto.
 */
type SimpleTextError = {
  required?: true;
  minlength?: { requiredLength: number; actualLength: number };
};

/**
 * Componente reutilizável de campo de senha baseado no Angular Material.
 *
 * ## 📌 Funcionalidades
 * - Integração com Reactive Forms
 * - Alternância de visibilidade da senha (mostrar/ocultar)
 * - Ícone de prefixo opcional
 * - Ícone dinâmico para visibilidade
 * - Exibição automática de mensagens de erro
 *
 * ## 📥 Inputs
 *
 * | Nome               | Tipo        | Obrigatório | Descrição |
 * |--------------------|------------|------------|----------|
 * | `form`             | FormGroup  | ✔️ Sim     | Formulário reativo que contém o controle |
 * | `controlName`      | string     | ✔️ Sim     | Nome do FormControl dentro do FormGroup |
 * | `label`            | string     | ❌ Não     | Label exibida acima do campo |
 * | `placeholder`      | string     | ❌ Não     | Placeholder do input (fallback: usa label) |
 * | `disabled`         | boolean    | ❌ Não     | Define se o campo estará desabilitado |
 * | `prefixIcon`       | string     | ❌ Não     | Ícone exibido no início do campo |
 * | `showPasswordIcon` | string     | ❌ Não     | Ícone exibido quando a senha está visível |
 * | `hidePasswordIcon` | string     | ❌ Não     | Ícone exibido quando a senha está oculta |
 *
 * ## 💡 Exemplo de uso
 *
 * ```html
 * <app-password-field
 *   [form]="form"
 *   controlName="password"
 *   label="Senha"
 *   placeholder="Digite sua senha"
 *   prefixIcon="lock"
 * />
 * ```
 */
@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './password-field.html',
  styleUrl: './password-field.scss',
})
export class PasswordFieldComponent {
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
   * Ícone exibido no início do campo (prefixo)
   */
  @Input() prefixIcon?: string;

  /**
   * Ícone exibido quando a senha está visível
   */
  @Input() showPasswordIcon = 'visibility';

  /**
   * Ícone exibido quando a senha está oculta
   */
  @Input() hidePasswordIcon = 'visibility_off';

  /**
   * Define se a senha está oculta
   */
  isPasswordHidden = true;

  /**
   * Alterna a visibilidade da senha
   */
  toggleVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

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

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return null;
    }

    const errors = control.errors as SimpleTextError & Record<string, unknown>;

    if (errors['required']) {
      return 'Este campo é obrigatório';
    }

    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `Mínimo de ${requiredLength} caracteres`;
    }

    return 'Valor inválido';
  }
}