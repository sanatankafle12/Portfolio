document.getElementById('next-1').onclick = function(){
    let lists = document.querySelectorAll('.item-1');
    document.getElementById('slide-1').appendChild(lists[0]);
}
document.getElementById('prev-1').onclick = function(){
    let lists = document.querySelectorAll('.item-1');
    document.getElementById('slide-1').prepend(lists[lists.length - 1]);
}
  