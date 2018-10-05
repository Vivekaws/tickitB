export class seatClass{
    row:String;
    number:number;
    status:String;
    classes:{};
    constructor(row,number,status){
        this.row=row;
        this.number=number;
        this.status=status;
        this.classes={"seat":true,"selected":false,"no-available":false};
    }
}