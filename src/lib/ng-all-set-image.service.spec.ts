import { TestBed } from '@angular/core/testing';
import { NgAllSetImageService } from '../public-api';


describe('NgAllSetImageService', () => {
  let service: NgAllSetImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgAllSetImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
