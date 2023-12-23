import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCreatorComponent } from './cat-creator.component';

describe('CatCreatorComponent', () => {
  let component: CatCreatorComponent;
  let fixture: ComponentFixture<CatCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
