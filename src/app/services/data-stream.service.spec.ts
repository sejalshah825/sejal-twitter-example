import { TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { DataStreamService } from './data-stream.service';

describe('DataStreamService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
  );

  it('should be created', () => {
    const service: DataStreamService = TestBed.get(DataStreamService);
    expect(service).toBeTruthy();
  });
});
