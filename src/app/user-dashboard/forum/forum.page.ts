import { Component, OnInit } from '@angular/core';
import { forum } from 'src/shared/models/forum.model';
import { FormGroup,ReactiveFormsModule , FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ForumService } from 'src/shared/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  forumInput: forum;
  loggedInUser: any;
  postForm: FormGroup;
  ForumList: forum[];
  contentId:string;
  latestrev:string;
  successMessage:string;
  post:boolean;
  constructor(
    private router: Router,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private forumService: ForumService
  ) { }

  ngOnInit() {
    this.storage.get('local_community_user').then(data => {
      if(data!=null)
      {
        this.loggedInUser = data;
        console.log(JSON.stringify(this.loggedInUser))
      }
    })
    .catch(err => {
      console.log(err.message);
    });
    this.postForm = this.formBuilder.group({
      title:['',[Validators.required,Validators.maxLength(30)]],
      content:['',[Validators.required,Validators.maxLength(200)]]
    });
  }
  CreatePost(){
    if(this.postForm.valid && this.postForm != null){
      let forumInput = new forum;
      forumInput.content = this.postForm.value.content;
      forumInput.title = this.postForm.value.title;
      console.log('Ye input h',forumInput.content,forumInput.title);
      forumInput.communityId = this.loggedInUser.communityId;
      forumInput.whenCreated = new Date();
      this.forumService.CreatePost(forumInput).subscribe( (data) =>{
        console.log('Ye rha data',data);
        this.contentId = data._id;

        this.successMessage = JSON.stringify(data);

      // this.router.navigate(["createPost"]);
      })
    }  
  }
  viewPost(){
    this.forumService.ViewAllPost(this.loggedInUser.communityId).subscribe((data) => {
      this.ForumList = data;
    })
  }

  deletePost(){
    this.forumService.DeletePost(this.contentId,this.latestrev).subscribe((data) => {
      this.successMessage = data.status;
    })
  }
  fab(){
    this.post = true;
    this.CreatePost();    
  }


}
