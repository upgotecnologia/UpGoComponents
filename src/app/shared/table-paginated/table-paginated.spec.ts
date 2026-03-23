import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePaginated } from './table-paginated';

describe('TablePaginated', () => {
  let component: TablePaginated;
  let fixture: ComponentFixture<TablePaginated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePaginated],
    }).compileComponents();

    fixture = TestBed.createComponent(TablePaginated);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
