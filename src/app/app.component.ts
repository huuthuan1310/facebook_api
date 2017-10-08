import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import linkifyStr from 'linkifyjs/string';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  list: any;
  paging: any;
  token = 'EAAAAUaZA8jlABANGd6IpXk0e6g9IzoGRX6vxlZATbnMOq6NmZBKr70etmzPolCRZBwXBjjtYrvXQ0noH1sWKeFgQRiRjOPBEJZBOQZBV732u6L24LsZCffk0CnAPkz8dF9fLlk0YwohMrK4nXXEbo4CORIIQloW5OF5shcCpePKg5rTNmbmkU8B';
  fields = 'full_picture,from,caption,description,message,updated_time,likes,type,source,link,created_time,shares,status_type,with_tags,message_tags,comments,permalink_url';
  limit = 10;
  loading = true;
  constructor(public http: Http, private cd: ChangeDetectorRef) { }
  ngOnInit() {
    this.firstLoad();
  };

  onScroll() {
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
      console.log(this.list);
    });
  }

  onScrollUp() {
    if (this.list.length > 100) {
      this.loading = true;
      this.firstLoad();
    }
  }

  firstLoad() {
    // Make the HTTP request:
    this.http.get('https://graph.facebook.com/v2.10/1173636692750000/feed?fields=' + this.fields + '&limit=' + this.limit + '&access_token=' + this.token).subscribe(data => {
      // Read the result field from the JSON response.
      let obj = [];
      var options = {/* … */ };
      this.paging = data.json().paging;
      for (let i = 0; i < data.json().data.length; i++) {
        let item = data.json().data[i];
        item.message = linkifyStr(item.message, options);
        obj.push(item);
      }
      this.list = obj;
      this.loading = false;
      console.log(data.json());
    });
  }
}
