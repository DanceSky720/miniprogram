module.exports=ft

function convert24(val) {
  if (val < 10) {
    val = "0" + val;
  }
  return val;
}

function ft(time) {
  var dd = new Date(time);
  return dd.getFullYear() + "-" + convert24(dd.getMonth()) + "-" + convert24(dd.getDate()) + " " + convert24(dd.getHours()) + ":" + convert24(dd.getMinutes()) + ":" + convert24(dd.getSeconds());
}