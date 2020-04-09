import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Post} from './posts';
import {Injectable} from '@angular/core';
import {DatePipe, formatDate} from '@angular/common';
import {Category} from './category';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const posts = [
      {
        id: 1,
        author: 'Bekarys',
        date: formatDate(new Date(), 'MMM d, y', 'en'),
        title: 'First title',
        description: 'Последние уточнения по требованиям:\n' +
          '\n' +
          '– на этой неделе защищаем только фронт часть\n' +
          // tslint:disable-next-line:max-line-length
          '– должна быть готова окончательная версия вёрстки и структуры проекта. дальнейшие изменения могут быть только по привязке бэк части\n' +
          '– для каждой модели необходим соответствующий интерфейс. интерфейсы применяются при работе с запросами (вместо any)\n' +
          '– для связи с бэкэндом должны использоваться сервисы\n' +
          // tslint:disable-next-line:max-line-length
          '– пока что работаем с локальной базой данных, как в лабках. то есть необходимо заранее создать некоторое количество данных по каждой модели, которые можно отображать на странице',
        categoryId: 2,
        likes: 10,
        dislikes: 1
      },
      {
        id: 2,
        author: 'John',
        date: formatDate(new Date(), 'MMM d, y', 'en'),
        title: 'Second title',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  ',
        categoryId: 1,
        likes: 1,
        dislikes: 14
      }

    ];
    const categories = [
      {id: 1, name: 'Education'},
      {id: 2, name: 'Teachers'},
      {id: 3, name: 'Canteed'},
      {id: 4, name: 'Administration'}
    ];
    return {posts, categories};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(posts: Post[]): number {
    return posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
  }
}
