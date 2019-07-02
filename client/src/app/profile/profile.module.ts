import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {MatListModule} from '@angular/material/list';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }]),
    MatListModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
