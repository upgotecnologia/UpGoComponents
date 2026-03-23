import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

/**
 * Define a estrutura de uma coluna da tabela.
 */
export type TableColumn<T = any> = {
  /**
   * Chave do campo no objeto de dados
   */
  key: string;

  /**
   * Título exibido no header da coluna
   */
  label: string;

  /**
   * Função opcional para customizar a exibição do valor
   */
  formatter?: (row: T) => string | number;

  /**
   * Define se a coluna deve ser exibida
   */
  visible?: boolean;
};

/**
 * Componente reutilizável de tabela baseado no Angular Material.
 *
 * ## 📌 Funcionalidades
 * - Renderização dinâmica de colunas
 * - Suporte a qualquer tipo de dado
 * - Customização de exibição via formatter
 * - Integração com Angular Material Table
 *
 * ## 📥 Inputs
 *
 * | Nome        | Tipo                | Obrigatório | Descrição |
 * |------------|---------------------|------------|----------|
 * | `columns`  | TableColumn[]       | ✔️ Sim     | Configuração das colunas da tabela |
 * | `data`     | any[]               | ✔️ Sim     | Lista de dados a serem exibidos |
 *
 * ## 💡 Exemplo de uso
 *
 * ```html
 * <app-table
 *   [columns]="columns"
 *   [data]="users"
 * />
 * ```
 *
 * ```ts
 * columns = [
 *   { key: 'name', label: 'Nome' },
 *   { key: 'email', label: 'E-mail' },
 *   {
 *     key: 'status',
 *     label: 'Status',
 *     formatter: (row) => row.status ? 'Ativo' : 'Inativo'
 *   }
 * ];
 * ```
 */
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
})
export class TableComponent<T = any> {
  /**
   * Configuração das colunas da tabela
   */
  @Input() columns: TableColumn<T>[] = [];

  /**
   * Lista de dados exibidos na tabela
   */
  @Input() data: T[] = [];

  /**
   * Retorna apenas colunas visíveis
   */
  get visibleColumns(): TableColumn<T>[] {
    return this.columns.filter((col) => col.visible !== false);
  }

  /**
   * Retorna as chaves das colunas para o Angular Material
   */
  get displayedColumns(): string[] {
    return this.visibleColumns.map((col) => col.key as string);
  }

  /**
   * Retorna o valor a ser exibido na célula
   *
   * @param row Linha atual
   * @param column Configuração da coluna
   */
  getCellValue(row: T, column: TableColumn<T>): string | number {
    if (column.formatter) {
      return column.formatter(row);
    }

    return (row as any)[column.key];
  }
}