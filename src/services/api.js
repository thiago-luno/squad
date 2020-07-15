const ServiceApi = {

    getPlayer: function(name) {
        return fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${name}`,  { method: 'get' })
        .then(res => res.json())
        .then(json => json.player)
    }
}

export default ServiceApi;