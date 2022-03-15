import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../../environments/environment';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let http: HttpTestingController;
  let service: UploadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(UploadService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('should call the correct endpoint when getting videos', () => {
      service.getVideos().subscribe((videos) => {
        expect(videos.length).toBe(1);
        expect(videos[0].id).toBe(1);
        expect(videos[0].path).toBe('bogus/path');
      });
      const req = http.expectOne(
        `${environment.apiBaseUrl}/videos`
      );
      expect(req.request.method).toBe('GET');
      req.flush([{ id: 1, path: 'bogus/path' }]);
      http.verify();
    });
  });

  describe('POST', () => {
    it('should call the correct endpoint when uploading a video', () => {
      const fileBlob = new File([''], 'bogusFile', { type: 'text/html' });
      service.upload(fileBlob)
      .subscribe((video) => {
        expect(video.id).toBe(1);
        expect(video.path).toBe('bogus/path');
      });
      const req = http.expectOne(
        `${environment.apiBaseUrl}/videos`
      );
      expect(req.request.method).toBe('POST');
      req.flush({ id: 1, path: 'bogus/path' });
      http.verify();
    });
  });
});
