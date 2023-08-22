import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

const COMPONENTS = [];

const IMPORTS = [
  CommonModule,
  ToastrModule.forRoot({
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  }),
];

//Third party packages goes here.
@NgModule({
  declarations: [...COMPONENTS],
  imports: [...IMPORTS],
  exports: [ToastrModule],
})
export class SharedModule {}
