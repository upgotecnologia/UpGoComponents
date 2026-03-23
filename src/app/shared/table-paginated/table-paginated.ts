import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/**
 * Define a estrutura de uma coluna da tabela paginada.
 */
export type TablePaginatedColumn<T = any> = {
  /**
   * Chave do campo no objeto de dados
   */
  key: string;

  /**
   * Título exibido no header
   */
  label: string;

  /**
   * Função opcional para formatar o valor
   */
  formatter?: (row: T) => string | number;

  /**
   * Define se a coluna será exibida
   */
  visible?: boolean;
};

/**
 * Componente reutilizável de tabela com paginação baseado no Angular Material.
 *
 * ## 📌 Funcionalidades
 * - Paginação automática (MatPaginator)
 * - Colunas dinâmicas
 * - Suporte a formatter
 * - Alta reutilização
 *
 * ## 📥 Inputs
 *
 * | Nome        | Tipo                        | Obrigatório | Descrição |
 * |------------|-----------------------------|------------|----------|
 * | `columns`  | TablePaginatedColumn[]      | ✔️ Sim     | Configuração das colunas |
 * | `data`     | any[]                       | ✔️ Sim     | Dados da tabela |
 * | `pageSize` | number                      | ❌ Não     | Itens por página |
 *
 * ## 💡 Exemplo de uso
 *
 * ```html
 * <app-paginated-table
 *   [columns]="columns"
 *   [data]="data"
 *   [pageSize]="5"
 * />
 * ```
 */
@Component({
  selector: 'app-paginated-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table-paginated.html',
  styleUrls: ['./table-paginated.scss'],
})
export class TablePaginatedComponent<T = any> implements AfterViewInit {
  /**
   * Configuração das colunas
   */
  @Input() columns: TablePaginatedColumn<T>[] = [];

  /**
   * Dados da tabela
   */
  @Input() set data(value: T[]) {
    this.dataSource.data = value || [];
  }

  /**
   * Tamanho da página
   */
  @Input() pageSize = 5;

  /**
   * Referência do paginator
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * DataSource do Angular Material
   */
  dataSource = new MatTableDataSource<T>([]);

  /**
   * Inicializa o paginator
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Colunas visíveis
   */
  get visibleColumns(): TablePaginatedColumn<T>[] {
    return this.columns.filter((col) => col.visible !== false);
  }

  /**
   * Chaves das colunas
   */
  get displayedColumns(): string[] {
    return this.visibleColumns.map((col) => col.key);
  }

  /**
   * Valor exibido na célula
   */
  getCellValue(row: T, column: TablePaginatedColumn<T>): string | number {
    if (column.formatter) {
      return column.formatter(row);
    }

    return (row as any)[column.key];
  }
}