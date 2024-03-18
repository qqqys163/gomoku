const utils = {
    emit(event:string, detail:any){
        document.dispatchEvent(new CustomEvent(event, {detail}));
    }
}
export default utils;