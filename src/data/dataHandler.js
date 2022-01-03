
import id_2 from './../data/2.json'
import id_7 from './../data/7.json'
import id_2627 from './../data/2627.json'
import id_10780 from './../data/10780.json'
import id_13116 from './../data/13116.json'
import id_14842 from './../data/14842.json'
import id_17172 from './../data/17172.json'
import id_20566 from './../data/20566.json'
import id_21632 from './../data/21632.json'
import id_27366 from './../data/27366.json'
import id_29127 from './../data/29127.json'
import id_30024 from './../data/30024.json'
import id_30332 from './../data/30332.json'
import id_31870 from './../data/31870.json'
import id_33550 from './../data/33550.json'
import id_34407 from './../data/34407.json'
import id_34429 from './../data/34429.json'
import id_36495 from './../data/36495.json'
import id_37327 from './../data/37327.json'
import id_38639 from './../data/38639.json'

const jsonFiles = [
    id_2,
    id_7,
    id_2627,
    id_10780,
    id_13116,
    id_14842,
    id_17172,
    id_20566,
    id_21632,
    id_27366,
    id_29127,
    id_30024,
    id_30332,
    id_31870,
    id_33550,
    id_34407,
    id_34429,
    id_36495,
    id_37327,
    id_38639,
]

export function getData (){
    let data = [];
    for (let index = 0; index < jsonFiles.length; index++) {
        data.push({
            pictureUrl: jsonFiles[index].profile.pictureUrl,
            userName: jsonFiles[index].profile.name,
            dateToDayId: jsonFiles[index].calendar.dateToDayId,
            daysWithDetails: jsonFiles[index].calendar.daysWithDetails
        })        
    }    
    return data;
}
export default {getData};