const ServiceApi = {

    getPlayer: function (name) {
        return fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${name}`, { method: 'get' })
            .then(res => res.json())
            .then(json => json.player)
    },

    getSquads: function () {
        return JSON.parse(sessionStorage.getItem('teams')) ? JSON.parse(sessionStorage.getItem('teams')) : [];
    },

    getSquadById: function (id) {
        const filter = this.getSquads().filter(squad => squad.id == id);
        return filter[0];
    },

    setSquad: function (squad) {
        if (this.getSquads().length > 0) {
            const duplicated = this.getSquads().filter(team => squad.id == team.id)
            if (duplicated.length > 0) {
                let newArray = [];
                this.getSquads().forEach((element, index) => {
                    if (element.id == squad.id) {
                        newArray[index] = squad;
                    } else {
                        newArray[index] = element;
                    }
                });
                sessionStorage.setItem('teams', JSON.stringify(newArray));
            }

            else {
                return sessionStorage.setItem('teams', JSON.stringify([].concat(squad, ...this.getSquads())));
            }
        }

        else {

            return sessionStorage.setItem('teams', JSON.stringify([squad]));
        }
    },

    deleteSquad: function (idSquad) {
        const list = this.getSquads().filter(team => team.id !== idSquad);
        sessionStorage.setItem('teams', JSON.stringify(list));
    },

    getMostPickedPlayers: function () {
        let squads = this.getSquads();
        let arr1 = []
        for(let y = 0; y < squads.length; y++) {
            for(let z = 0; z < squads[y].squad.squad.length; z++) {
                if(squads[y].squad.squad[z].value !== null)
                    arr1.push(squads[y].squad.squad[z].value)

            }
        }
        let mf = 1;
        let m = 0;
        let item;
        for (let i=0; i<arr1.length; i++)
        {
                for (let j=i; j<arr1.length; j++)
                {
                        if (arr1[i] == arr1[j])
                         m++;
                        if (mf<m)
                        {
                          mf=m; 
                          item = arr1[i];
                        }
                }
                m=0;
        }

        return item;
    }
}

export default ServiceApi;