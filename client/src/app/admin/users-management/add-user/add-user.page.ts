import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
   //validation
   public addForm: FormGroup;
   public submitted: boolean = false;
   
  public previewAvatar = null;
  public userAvatar: File;
  public user: UserModel = new UserModel();

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  public navigateBack() {
    this.navCtrl.navigateRoot(['admin/users-management/list-users']);
  }

  // public uploadImage(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = e => this.previewAvatar = reader.result;
  //     reader.readAsDataURL(file);
  //   }
  //   this.userAvatar = event.target.files[0];
  // }

  public createUser() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }

    this.usersService.createUser(this.addForm.value).subscribe();
    // if (this.previewAvatar) {
    //   this.usersService.uploadImage(this.userAvatar, this.user._id).subscribe();
    // }
    
    this.usersService.setAddedUser(this.addForm.value);
    this.navigateBack();
  }
}
