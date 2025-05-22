import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './shared/services/api.service';
import { Post } from './shared/types/post.interface';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { TodoComponent } from './todos/components/todo/todo.component';
import { MainComponent } from './todos/components/main/main.component';
import { HeaderComponent } from './todos/components/header/header.component';
import { FooterComponent } from './todos/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PaginationComponent,
    TodoComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  providers: [ApiService],
})
export class AppComponent {
  apiService = inject(ApiService);
  currentPage: number = 1;

  ngOnInit() {
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        console.log(posts);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      },
    });
  }

  onSendPost() {
    const newPost: Post = {
      title: 'New Post',
      body: 'This is the body of the new post.',
      userId: 101,
      id: 101, // Assuming you want to set an ID for the new post
    };
    this.apiService.createPost(newPost).subscribe({
      next: (post) => {
        console.log('Post created:', post);
      },
      error: (error) => {
        console.error('Error creating post:', error);
      },
    });
  }

  onPageChange(page: number) {
    console.group('%c GROUP', 'color:#84B59F');
    console.log({ page });
    console.groupEnd();
    this.currentPage = page;
  }
}
