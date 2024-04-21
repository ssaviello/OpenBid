import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTableUserComponent } from './project-table-user.component';

describe('ProjectTableUserComponent', () => {
  let component: ProjectTableUserComponent;
  let fixture: ComponentFixture<ProjectTableUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTableUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectTableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
