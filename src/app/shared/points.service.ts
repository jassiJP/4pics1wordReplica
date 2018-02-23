import { Injectable } from "@angular/core";
import { Pics } from '../pic/pics.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PointsService {
    points = [
        {
            difficulty: 0,
            points: 4
        },
        {
            difficulty: 1,
            points: 6
        },
        {
            difficulty: 2,
            points: 8
        },
        {
            difficulty: 3,
            points: 10
        },
        {
            difficulty: 4,
            points: 12
        }
    ];

    pointsUpdated = new Subject();

    currentPoints = 0;

    addPoints(difficulty: number) {
        const aligPoints = this.points.filter((alig) => {
            if (alig.difficulty === difficulty) return true;
        }); //this will always return 1 element but in an array

        this.currentPoints += aligPoints[0].points;
    }
}