import {
    Component, Input,
    CORE_DIRECTIVES
} from 'angular2/angular2';

import {Hero} from '../models/hero'


@Component({
    selector: 'hero-show',
    template: `
        <style>
            table#hero-show img {
                width: 400px;
                height: 300px;
            }
            table#hero-show td.label {
                width: 25%;
                text-align: right;
                color: #555;
            }
        </style>
        <div *ng-if="hero">
            <h2>Hero details:</h2>
            <table class="table table-striped"  id="hero-show">
                <tbody>
                    <tr>
                        <td class="label">Name</td>
                        <td>{{hero.name}}</td>
                    </tr>
                    <tr>
                        <td class="label">Type</td>
                        <td>{{hero.heroType}}</td>
                    </tr>
                    <tr [hidden]="!hero.quote">
                        <td class="label">Quote</td>
                        <td>{{hero.quote}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    directives: [CORE_DIRECTIVES],
})

export class HeroViewer {
    @Input() hero: Hero;
    constructor() {
    }
}
