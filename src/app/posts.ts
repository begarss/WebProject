import DateTimeFormat = Intl.DateTimeFormat;

export interface Post {
  id: number;
  author: string;
  image: ImageBitmap;
  date: DateTimeFormat;
  title: string;
  description: string;
  categoryId: number;
  likes: 0;
  dislikes: 0;
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
