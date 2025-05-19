import { ApiService } from './api.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Post } from '../types/post.interface';

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
});
