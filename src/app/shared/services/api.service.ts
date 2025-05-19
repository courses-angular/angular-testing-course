import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types/post.interface';

@Injectable()
export class ApiService {
  httpClient = inject(HttpClient);
  apiUrl = 'https://jsonplaceholder.typicode.com';

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.apiUrl}/posts`);

  }

  createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${this.apiUrl}/posts`, post);
  }
}
