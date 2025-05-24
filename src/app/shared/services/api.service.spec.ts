import { ApiService } from './api.service';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Post } from '../types/post.interface';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates ApiService', () => {
    expect(apiService).toBeTruthy();
  });

  it('should return list of posts', () => {
    let response: Post[] | undefined;
    apiService.getPosts().subscribe((posts) => {
      response = posts;
    });
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts',
    );
    req.flush([
      {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'This is the body of post 1',
      },
    ]);
    expect(response).toEqual([
      {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'This is the body of post 1',
      },
    ]);
  });
  it('should create a post', () => {
    const newPost: Post = {
      userId: 1,
      id: 1,
      title: 'Post 1',
      body: 'This is the body of post 1',
    };
    let response: Post | undefined;
    apiService.createPost(newPost).subscribe((post) => {
      response = post;
    });
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts',
    );
    req.flush({
      userId: 1,
      id: 1,
      title: 'Post 1',
      body: 'This is the body of post 1',
    });
    expect(response).toEqual({
      userId: 1,
      id: 1,
      title: 'Post 1',
      body: 'This is the body of post 1',
    });
  });
  it('should pass POST request', () => {
    const newPost: Post = {
      userId: 1,
      id: 1,
      title: 'Post 1',
      body: 'This is the body of post 1',
    };
    let response: Post | undefined;
    apiService.createPost(newPost).subscribe((post) => {
      response = post;
    });
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts',
    );
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newPost);
    expect(req.request.url).toEqual(req.request.url);
  });
  it('should throw an error if request fails', () => {
    let actualError: HttpErrorResponse | undefined;
    apiService.getPosts().subscribe({
      next: () => {
        fail('should have failed with 500 error');
      },
      error: (error) => {
        actualError = error;
      },
    });
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts',
    );
    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Server Error',
    });
    if (!actualError) {
      throw new Error('actualError is undefined');
    }
    expect(actualError.status).toEqual(500);
    expect(actualError.statusText).toEqual('Server Error');
    expect(actualError.error).toEqual('Something went wrong');
  });

  it('should return list of posts with waitForAsync', waitForAsync(() => {
    apiService.getPosts().subscribe((posts) => {
      expect(posts).toEqual([
        {
          userId: 1,
          id: 1,
          title: 'Post 1',
          body: 'This is the body of post 1',
        },
      ]);
    });
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts',
    );
    req.flush([
      {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'This is the body of post 1',
      },
    ]);
  }));
});
