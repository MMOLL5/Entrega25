import faker from 'faker';

class Recurso1 {
    constructor() {
        this.data = []
    }

    findIndex(id) {
        return this.data.findIndex(aResource => aResource.id == id);
    }

    get(id = undefined) {
        if (id)
            return this.data.filter(aResource => aResource.id == id)

        return this.data;
    }

    post() {
       return  this.data.push({
            id: this.data.length + 1,
            title: faker.commerce.productName(),
            precio: faker.commerce.price(),
            thumbnail: faker.internet.url(),
        })

    }

    put(id, data) {
        const index = this.findIndex(id);
        const recursoViejo = this.data[index];
        const recursoNuevo = { id, ...data };

        const recursoActualizado = { ...recursoViejo, ...recursoNuevo };
        this.data.splice(index, 1, recursoActualizado);
    }

    delete(id){
        const index = this.findIndex(id);
        this.data.splice(index, 1);
    }
}

export const Recurso1API = new Recurso1();