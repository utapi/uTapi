import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../system.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  star = "ハッピー"
  title = ""
  content = ""
  constructor(private alertController: AlertController,
    private systemService: SystemService,
    private location: Location) { }

  ngOnInit() {
  }

  async toFeedbackComplete() {

    this.systemService.saveFeedback(this.star, this.title, this.content)

    const alert = await this.alertController.create({
      header: 'ありがとうございます',
      message: 'レビューを送信しました',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // this.location.back();
          }
        }
      ]
    });
    await alert.present();


  }

}
