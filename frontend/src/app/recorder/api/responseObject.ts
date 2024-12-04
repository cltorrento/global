export class ResponseObject {
    constructor(
        public id: string,
        public logicalNumber: string,
        public status: string,
        public differenceInSeconds: number,
        public labelStatus: string,
        public totalSeconds: number,
        public color: string,
        public target: string,
        public labelTarget: string
    ){}
}