
import elasticsearch from 'elasticsearch'
import cities from "./cities.json"

export const createIndex = (client:  elasticsearch.Client, index: string) => {
    client.indices.create({
        index: index,

    }, (error, resp)=>{
        if (error) {
            console.log(error)
        } else {
            console.log("created a new index", resp);
        }
    })
}

export const addIndex = (client: elasticsearch.Client, index: string, type: string, body: Record<string, string>) =>{
    client.index({
        index: index,
        type: type,
        body: body
    },(error, resp) =>{
        if (error) {
            console.log(error)
        } else {
            console.log(resp)
        }
    })
}



export const bulkAdd = (client, index, type) ={
    lext bulk: any = []
    cities.forEach(city =>{
        bulk.push({index:{
                _index:"scotch.io-tutorial",
                _type:"cities_list",
            }
        })
        bulk.push(city)
    })
}
// require the array of cities that was downloaded

// declare an empty array called bulk

//loop through each city and create and push two objects into the array in each loop
//first object sends the index and type you will be saving the data as
//second object is the data you want to index

//perform bulk indexing of the data passed
client.bulk({body:bulk}, function( err, response  ){
    if( err ){
        console.log("Failed Bulk operation".red, err)
    } else {
        console.log("Successfully imported %s".green, cities.length);
    }
});