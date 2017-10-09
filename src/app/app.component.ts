import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import linkifyStr from 'linkifyjs/string';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { trigger, style, animate, transition } from '@angular/animations';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('500ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  list: any;
  paging: any;
  token = 'EAAAAUaZA8jlABANGd6IpXk0e6g9IzoGRX6vxlZATbnMOq6NmZBKr70etmzPolCRZBwXBjjtYrvXQ0noH1sWKeFgQRiRjOPBEJZBOQZBV732u6L24LsZCffk0CnAPkz8dF9fLlk0YwohMrK4nXXEbo4CORIIQloW5OF5shcCpePKg5rTNmbmkU8B';
  fields = 'full_picture,from,caption,description,message,updated_time,likes,type,source,link,created_time,shares,status_type,with_tags,message_tags,comments,permalink_url';
  limit = 12;
  loading = true;
  facebookId = 'leothuan';
  loadMore = false;
  constructor(
    public http: Http,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog) { }
  ngOnInit() {
    this.firstLoad(this.facebookId);
  };

  onScroll() {
    if (this.paging) {
      this.loadMore = true;
      let page = this.paging.next.replace('limit=100', 'limit=30');
      this.http.get(page).subscribe(data => {
        // Read the result field from the JSON response.
        let obj = this.list;
        var options = {/* … */ };
        this.paging = data.json().paging;
        for (let i = 0; i < data.json().data.length; i++) {
          let item = data.json().data[i];
          item.message ? item.message = linkifyStr(item.message, options) : '';
          obj.push(item);
        }
        this.list = obj;
        this.cd.markForCheck();
        this.loadMore = false;
        console.log(this.list);
      });
    } else {
      console.log('hết!');
    }
  }

  onScrollUp() {
    if (this.list.length > this.limit) {
      // this.loading = true;
      this.firstLoad(this.facebookId);
    }
  }

  firstLoad(facebookId, scrollTop?) {
    // Make the HTTP request:
    this.http.get('https://graph.facebook.com/v2.10/' + facebookId + '/feed?fields=' + this.fields + '&limit=' + this.limit + '&access_token=' + this.token).subscribe(data => {
      // Read the result field from the JSON response.
      let obj = [];
      var options = {/* … */ };
      this.paging = data.json().paging;
      for (let i = 0; i < data.json().data.length; i++) {
        let item = data.json().data[i];
        item.message ? item.message = linkifyStr(item.message, options) : '';
        obj.push(item);
      }
      this.list = obj;
      this.loading = false;
      scrollTop ? this.scrollToTop() : '';
      console.log(data.json());
    });
  }

  openDialog(item): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  submit(facebookId) {
    if (facebookId) {
      this.facebookId = facebookId;
      this.firstLoad(this.facebookId, true);

    }
  }

  scrollToTop() {
    $("#content").animate({ scrollTop: 0 }, 500, 'swing', function () {
    });;
  }
}
