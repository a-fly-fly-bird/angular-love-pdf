import { PdfMergeService } from './shared/service/pdf-merge.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

type Props = {
  name: string;
} & (
  | {
      gender: 'male';
      salary: number;
    }
  | {
      gender: 'female';
      weight: number;
    }
);

type ApiResponse<T> =
  | { status: 'success'; data: T; timestamp: Date }
  | { status: 'error'; message: string; timestamp: Date };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pdf: any;
  files = [];

  helloTs() {
    let response1: ApiResponse<number> = {
      status: 'success',
      data: 100,
      timestamp: new Date(),
    };
    let response2: ApiResponse<number> = {
      status: 'error',
      message: 'error la',
      timestamp: new Date(),
    };
  }

  constructor(
    // private pdfMergeService: PdfMergeService,
    private sanitizer: DomSanitizer,
  ) {}

  getFile() {
    let inputElement = document.getElementById('input');
    if (inputElement) {
      inputElement.addEventListener('change', this.handleFiles, false);
    }
  }
  handleFiles() {
    const fileList = this.files; /* 现在你可以处理文件列表 */
    console.log(fileList);
    console.log(URL.createObjectURL(this.files['0']));
    this.pdf = URL.createObjectURL(this.files['0']);
    console.log(this.pdf);
  }

  ngOnInit(): void {
    // this.pdfMergeService.pdf2$.subscribe((x) => {
    //   this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(x);
    //   this.getFile();
    // });
    this.getFile();
  }
}
