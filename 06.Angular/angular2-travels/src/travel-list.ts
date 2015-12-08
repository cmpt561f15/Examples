import {
    Component,
    CORE_DIRECTIVES
} from 'angular2/angular2';
import {
    ROUTER_DIRECTIVES
} from 'angular2/router';

import { Travel } from './travel'
import { TravelService } from './travel-service'
import { TravelShow } from './travel-show'


@Component({
    selector: 'travel-list',
    template: `
        <style>
            table#travel-list img {
                width: 60px;
                height: 45px;
            }
            table#travel-list .old {
                color: brown;
            }
        </style>
        <h2>Travels List:</h2>
        <div *ng-if="travelService.travels">
        <table class="pure-table pure-table-horizontal" id="travel-list">
            <tr>
                <th>Picture</th>
                <th>Place</th>
                <th>Country</th>
                <th>Year</th>
                <th></th>
            </tr>
            <tr *ng-for="#travel of travelService.travels">
                <td><img src="img/{{travel.img || 'none.jpg'}}"/></td>
                <!--<td [ng-class]="{old: travel.isOld()}">{{travel.place}}</td>-->
                <td>{{travel.place}}</td>
                <td>{{travel.country}}</td>
                <td>{{travel.year}}</td>
                <td>
                    <a href (click)="select(travel)" class="pure-button">
                        <i class="fa fa-caret-square-o-down"></i> Show
                    </a>
                    <a href [router-link]="['/Edit', {id: travel.id}]" class="pure-button">
                        <i class="fa fa-pencil-square-o"></i> Edit
                    </a>
                    <a href (click)="remove(travel)" class="pure-button">
                        <i class="fa fa-trash-o"></i> Remove
                    </a>
                </td>
            </tr>
        </table>
        <travel-show [travel]="selectedTravel"></travel-show>
        </div>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, TravelShow]
})
export class TravelList {
    selectedTravel: Travel;
    
    constructor(public travelService: TravelService) {
    }

    //auto-executed during the component initialization
    ngOnInit() {
        //If the travels list is undefined then fetch the data from REST service
        if (!this.travelService.travels) {
            this.travelService.fetchTravels().subscribe(
                    (travels : Travel[]) => {
                        for(let travel of travels) {
                            travel = new Travel(travel.id, travel.place, travel.country, travel.year, travel.img);
                        }
                        console.log('Travels', travels);
                        this.travelService.travels = travels
                    },
                    (err) => console.error('There was an error: ' + err),
                    () => console.log('Completed!')
            );
        }
    }
    
    select(travel: Travel) {
        this.selectedTravel = travel;
        return false;
    }
    remove(travel: Travel) {
        this.travelService.remove(travel);
        return false;
    }
}