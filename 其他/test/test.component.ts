import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
	test1 = {
        a: 111,
        b: '222'
    };
    test3 = 3333;
    cats = [
        {
            ttl: '分类1',
            href: '#',
            src: 'http://localhost:8000/imgs/11.jpg'
        },
        {
            ttl: '分类2',
            href: '#',
            src: 'http://localhost:8000/imgs/11.jpg'
        },
        {
            ttl: '分类3',
            href: '#',
            src: 'http://localhost:8000/imgs/11.jpg'
        },
        {
            ttl: '分类4',
            href: '#',
            src: 'http://localhost:8000/imgs/11.jpg'
        },
        {
            ttl: '分类5',
            href: '#',
            src: 'http://localhost:8000/imgs/11.jpg'
        },
        {
            ttl: '分类6',
            href: '#',
            src: 'http://localhost:8000/imgs/11.jpg'
        }
    ];

  constructor() { }

  ngOnInit() {
  }

}
