import { Injectable } from "@angular/core";

import { Pics } from '../pic/pics.model';

@Injectable()
export class DataService {
    picsData = [
        {
            difficulty: 0,
            pics: [
                new Pics("fan", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0024.jpg", false),
                new Pics("bat", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0010.jpg", false),
                new Pics("can", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0011.jpg", false),
                new Pics("hot", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0026.jpg", false),
                new Pics("bow", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0030.jpg", false)
            ]
        },
        {
            difficulty: 1,
            pics: [
                new Pics("ball", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0002.jpg", false),
                new Pics("fish", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0003.jpg", false),
                new Pics("jump", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0007.jpg", false),
                new Pics("date", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0008.jpg", false),
                new Pics("full", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0012.jpg", false)
            ]
        },
        {
            difficulty: 2,
            pics: [
                new Pics("dirty", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0001.jpg", false),
                new Pics("water", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0004.jpg", false),
                new Pics("cross", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0005.jpg", false),
                new Pics("alarm", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0014.jpg", false),
                new Pics("pound", "http://whats-theword.com/wp-content/uploads/2015/03/4-pics-1-word-0015.jpg", false)
            ]
        }
    ];

    getDataForDifficulty(diff: number) {
        return this.picsData.filter((data) => {
            return data.difficulty === diff ? true : false;
        });
    }
}