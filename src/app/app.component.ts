import { PdfMergeService } from './shared/service/pdf-merge.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pdf: any;

  constructor(
    private msg: NzMessageService,
    private pdfMergeService: PdfMergeService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    // this.pdfMergeService.pdfObserverable$.subscribe(
    //   (x) => {
    //     let file = new Blob([x], { type: 'application/pdf' });
    //     var fileURL = URL.createObjectURL(file);
    //     this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
    //   }
    // )
    this.pdfMergeService.pdf2$.subscribe((x) => {
      this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(x);
    });
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status === 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
}
