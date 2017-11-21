import { environment } from './../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import linkifyStr from 'linkifyjs/string';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { trigger, style, animate, transition } from '@angular/animations';
import * as $ from 'jquery';
import * as _ from 'lodash';
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
  token = environment.access_token;
  fields = 'full_picture,from,caption,description,message,updated_time,likes,type,source,link,created_time,shares,status_type,with_tags,message_tags,comments,permalink_url';
  limit = 10;
  loading = true;
  facebookId = 'HoneyNailSpa.Salon';
  loadMore = false;
  endPre = false;
  endNxt = false;
  dataStore: any;
  indexInDataStore = 0;
  numberItemsInFirstLoad = 12;
  numberLoadMore = 6;
  constructor(
    public http: Http,
    public dialog: MatDialog) { }
  ngOnInit() {
    this.firstLoad(this.facebookId);
  };

  onScroll() {
    // if (!this.endNxt && this.paging && this.paging.next) {
    this.loadMore = true;
    // let page = this.paging.next.replace('limit=' + this.limit, 'limit=6');
    // this.http.get(page).subscribe(data => {
    // Read the result field from the JSON response.
    // if (data && data.json()) {
    // if (data.json().paging) {
    //   this.paging = data.json().paging;
    //   this.endPre = false;
    // } else {
    //   this.endNxt = true;
    // }
    if (this.dataStore.data.length > 0) {
      // let obj = _.clone(this.list);
      // var options = {/* … */ };
      // for (let i = 0; i < data.json().data.length; i++) {
      //   let item = data.json().data[i];
      //   item.message ? item.message = linkifyStr(item.message, options) : '';
      //   obj.push(item);
      // }
      // if (obj.length > this.limit) {
      // obj.splice(0, 6);
      // }
      // this.list = obj;
      // console.log(this.list);
      if ((this.indexInDataStore + this.numberLoadMore) <= this.dataStore.data.length) {
        this.indexInDataStore = this.indexInDataStore + this.numberLoadMore;
        this.list = _.clone(this.dataStore.data.splice(this.indexInDataStore, this.numberLoadMore));
        this.loadMore = false;
      } else {

      }
    }
    // }
    // });
    // } else {
    // console.log('hết!');
    // }
  }

  onScrollUp() {
    // // if (this.list.length > this.limit) {
    // if (!this.endPre && this.paging && this.paging.previous) {
    //   this.loadMore = true;
    //   let page = this.paging.previous.replace('limit=' + this.limit, 'limit=6');
    //   this.http.get(page).subscribe(data => {
    //     // Read the result field from the JSON response.
    //     if (data && data.json()) {
    //       if (data.json().paging) {
    //         this.paging = data.json().paging;
    //         this.endNxt = false;
    //       } else {
    //         this.endPre = true;
    //       }
    //       if (data && data.json().data.length > 0) {
    //         let obj = [];
    //         let _obj = _.clone(this.list);
    //         var options = {/* … */ };
    //         this.paging = data.json().paging;
    //         for (let i = 0; i < data.json().data.length; i++) {
    //           let item = data.json().data[i];
    //           item.message ? item.message = linkifyStr(item.message, options) : '';
    //           obj.push(item);
    //         }
    //         _obj.unshift(obj);
    //         if (_obj.length > this.limit) {
    //           _obj.splice((_obj.length - 5), 6);
    //         }
    //         this.list = _obj;
    //         this.loadMore = false;
    //         if (obj.length > this.limit) {
    //           obj.splice(0, 6);
    //         }
    //         console.log(this.list);
    //       }
    //     }
    //   });
    // } else {
    //   console.log('hết!');
    // }
    // // }
  }

  firstLoad(facebookId, scrollTop?) {
    // Make the HTTP request:
    this.http.get('https://graph.facebook.com/v2.10/' + facebookId + '/feed?fields=' + this.fields + '&limit=' + this.limit + '&access_token=' + this.token).subscribe(data => {
      // Read the result field from the JSON response.
      let obj = [];
      var options = {/* … */ };
      this.dataStore = _.clone(data.json());
      this.paging = data.json().paging;
      for (let i = 0; i < data.json().data.length; i++) {
        let item = data.json().data[i];
        item.message ? item.message = linkifyStr(item.message, options) : '';
        let comments = item.comments;
        if (comments) {
          let _data = comments.data;
          if (_data) {
            for (let i = 0; i < _data.length; i++) {
              let cmt = _data[i];
              if (cmt.message_tags && cmt.message_tags.length > 0) {
                for (let y = 0; y < cmt.message_tags.length; y++) {
                  let mes_tag = cmt.message_tags[y];
                  cmt.message = cmt.message.replace(mes_tag.name, '<a style="text-decoration: none; color: #4267b2;" href="https://facebook.com/' + mes_tag.id + '" target="_blank">' + mes_tag.name + '</a>');
                }
              }
            }
          }
        }
        obj.push(item);
      }
      this.dataStore.data = _.clone(obj);
      // this.list = this.dataStore.data.splice(this.numberItemsInFirstLoad, this.dataStore.data.length - this.numberItemsInFirstLoad);
      this.list = this.dataStore.data;

      this.paging = data.json().paging;
      for (let i = 0; i < data.json().data.length; i++) {
        let item = data.json().data[i];
        item.message ? item.message.linkify(options) : '';
        // item.message.linkify(options);
        obj.push(item);
      }
      this.indexInDataStore = this.numberItemsInFirstLoad - 1;
      this.loading = false;
      scrollTop ? this.scrollToTop() : '';
      console.log(data.json());
    }, err => {
      alert('Sai Facebook ID');
    });
  }

  openDialog(item): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { item: item },
      // backdropClass: 'dialog',
      hasBackdrop: false,
      width: '100vw',
      height: '100vh',
      minWidth: '100vw',
      minHeight: '100vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  submit(facebookId) {
    if (facebookId) {
      this.loading = true;
      this.facebookId = facebookId;
      this.firstLoad(this.facebookId, true);
    }
  }

  scrollToTop() {
    $("#content").animate({ scrollTop: 0 }, 500, 'swing', function () {
    });;
  }

  getLoadMore(isNext) {
    if (!this.endPre && this.paging && this.paging.previous || !this.endNxt && this.paging && this.paging.next) {
      this.loadMore = true;
      let page = isNext ? this.paging.next.replace('limit=' + this.limit, 'limit=' + this.numberLoadMore) :
        this.paging.previous.replace('limit=' + this.limit, 'limit=' + this.numberLoadMore);
      this.callFBApi(page, data => {
        if (data && data.json()) {
          if (data.json().paging) {
            this.paging = data.json().paging;
            isNext ? this.endPre = false : this.endNxt = false;
          } else {
            isNext ? this.endNxt = true : this.endPre = true;
          }
          if (data && data.json().data.length > 0) {
            let obj = [];
            let _obj = _.clone(this.list);
            var options = {/* … */ };
            this.paging = data.json().paging;
            for (let i = 0; i < data.json().data.length; i++) {
              let item = data.json().data[i];
              item.message ? item.message = linkifyStr(item.message, options) : '';
              obj.push(item);
            }
            _obj.unshift(obj);
            // if (_obj.length > this.limit) {
            //   _obj.splice((_obj.length - 5), 6);
            // }
            this.list = _obj;
            this.loadMore = false;
            console.log(this.list);
          }
        }
      });
    } else {
      console.log('hết');
    }
  }

  callFBApi(url, callback) {
    this.http.get(url).subscribe(data => {
      // Read the result field from the JSON response.
      callback(data);
    }, err => {
      console.log(err);
    });
  }
}
