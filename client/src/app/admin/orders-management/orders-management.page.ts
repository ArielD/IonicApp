import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.page.html',
  styleUrls: ['./orders-management.page.scss'],
})
export class OrdersManagementPage implements OnInit {

  constructor(
    private menu: MenuController
  ) { }

  ngOnInit() {
  }

  public openMenu() {
    this.menu.open('start');
  }


}
