import { Component } from '@angular/core';
import { forum } from 'src/shared/models/forum.model';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ForumService } from 'src/shared/services/forum.service';
import { toastController } from '@ionic/core';
import { menuController } from '@ionic/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage {

  forumInput: forum;
  loggedInUser: any;
  postForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(30)]],
    content: ['', [Validators.required, Validators.maxLength(200)]]
  });;
  ForumList: forum[];
  contentId: string;
  latestrev: string;
  successMessage: string;
  post: boolean;
  flag: boolean;

  constructor(
    private router: Router,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private forumService: ForumService
  ) {
    this.flag = false;

  }

  ionViewWillEnter() {
    this.storage.get('local_community_user').then(data => {
      if (data != null) {
        this.loggedInUser = data;
        //console.log(JSON.stringify(this.loggedInUser))
        this.viewPost();
      }
    })
      .catch(err => {
        console.log(err.message);
      });
  }


  async openMenu() {
    await menuController.close();
    await menuController.open();
   console.log(menuController.getOpen())
  }

  admin() {
    this.storage.set('local_community_user', this.loggedInUser)
    this.router.navigateByUrl('admin');
  }

  logout() {
    this.storage.clear();
    this.router.navigateByUrl('home')
  }


  CreatePost() {
    if (this.postForm.valid && this.postForm != null) {
      let forumInput = new forum;
      forumInput.content = this.postForm.value.content;
      forumInput.title = this.postForm.value.title;
      forumInput.communityId = this.loggedInUser.communityId;
      forumInput.whenCreated = new Date();
      this.forumService.CreatePost(forumInput).subscribe((data) => {
        this.contentId = data.result.id;
        this.latestrev = data.result.rev;
        console.log(this.contentId, this.latestrev)
        this.successMessage = JSON.stringify(data);

        let messageObj = {
          message: 'Posted Successfully',
          status: 'accept'
        }
        this.flag = false;
        this.handleButtonClick(messageObj);

        // this.router.navigate(["createPost"]);
      })
    }
  }

  viewPost() {
    this.forumService.ViewAllPost(this.loggedInUser.communityId).subscribe((data) => {
      // console.log(JSON.stringify(data))
      if (data != null && data.length > 0) {
        //console.log("YIOEEEEEEE")
        this.ForumList = data;
        this.flag = false;
      }
      else {
        /// GENERATE ALERT FOR NO USER IN COMMUNITY
        let messageObj = {
          message: 'Sorry! No Posts to View',
          status: 'sorry'
        }
        this.ForumList = [];
        this.handleButtonClick(messageObj);
      }
    })
  }

  deletePost(post) {
    console.log('trash called', JSON.stringify(post));
    this.forumService.DeletePost(post._id, post._rev).subscribe((data) => {
      this.successMessage = data.status;
      let messageObj = {
        message: 'Post Deleted Successfully',
        status: 'reject'
      }
      this.flag = false;
      this.handleButtonClick(messageObj);

    })


  }

  async handleButtonClick(messageObject: any) {
    let color = '';
    let duration = 2000;
    if (messageObject.status == 'accept') {
      color = 'success'
    }
    else if (messageObject.status == 'reject') {
      color = 'dark'
    }
    else {
      color = 'tertiary'
      duration = 2000
      this.flag = true;
    }
    const toast = await toastController.create({
      color: color,
      duration: duration,
      message: messageObject.message
      // showCloseButton: true
    });

    await toast.present();
    if (this.flag === false)
      this.viewPost();

  }

  fab(event) {
    event.stopPropagation();
  }
}
