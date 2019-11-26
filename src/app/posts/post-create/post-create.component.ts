import { Component, OnInit, AfterViewInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, AfterViewInit{

  enteredTitle = '';
  enteredContent = '';
  postCreated;
  post: Post;
  private mode = 'create';
  private postId: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = "edit";
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId)
        .subscribe(postData =>  {
          this.post = { id: postData["post"]["_id"], title: postData["post"]["title"], content: postData["post"]["content"]};
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
      console.log(this.mode);
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(this.mode);
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
