const serialize = function(arr) {
    if(arr.length === 0) {
        return ''
    }
    var str = Array(arr).map((item) => {
        return item.name + '=' + item.value;
    })
    
    return str.join("&");
}
  
export default serialize;