import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SafePipe } from 'src/app/shared/pipe/safe.pipe';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-merge',
  standalone: true,
  imports: [CommonModule, NzDividerModule, SafePipe, NzTypographyModule],
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.scss'],
})
export class MergeComponent {
  pdfSrc: any;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.pdfSrc = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
