export class Path {
    source: string;
    destination: string;
    path: string;
    distance: string;
    duration: string;

    constructor(source: string,destination:string,path: string,distance: string,duration: string){

        this.source = source;
        this.destination = destination;
        this.path = path;
        this.distance = distance;
        this.duration = duration;
    }
}
