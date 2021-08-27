import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgAllSetImageComponent } from '../public-api';


describe('NgAllSetImageComponent', () => {
  let component: NgAllSetImageComponent;
  let fixture: ComponentFixture<NgAllSetImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgAllSetImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAllSetImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
