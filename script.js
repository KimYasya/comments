"use strict";

// Переменные

let commentsTime = function formatDate(date) {
  let d = date;
  d = ["0" + d.getHours(), "0" + d.getMinutes()].map((component) =>
    component.slice(-2)
  ); // взять последние 2 цифры из каждой компоненты

  // соединить компоненты в дату
  return d.slice(0, 3).join(":");
};

let commentsCurrentDate = function formatDate(date) {
  let d = date;

  d = [
    "0" + d.getDate(),
    "0" + (d.getMonth() + 1),
    "" + d.getFullYear(),
    "0" + d.getHours(),
    "0" + d.getMinutes(),
  ].map((component) => component.slice(-2)); // взять последние 2 цифры из каждой компоненты

  // соединить компоненты в дату
  return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
};

let form = document.querySelector(".add-comment");

let commentsName = document.querySelector(".add-comment__title");
let commentsText = document.querySelector(".add__comment");
let commentsDate = document.querySelector(".add-comment__date");
let addBtn = document.getElementById("add-comment__btn");
let commentsList = document.querySelector(".comments__list");
let errorName = document.getElementById("error_name");
let errorText = document.getElementById("error_text");
let likeBtn = document.getElementById("svg_like");

likeBtn.addEventListener("click", (event) => {
  event.preventDefault();

  likeBtn.classList.toggle("active");
});

// Добавление коммента

commentsName.value = localStorage.getItem("commentsName");
commentsName.oninput = () => {
  localStorage.setItem("commentsName", commentsName.value);
};

commentsText.value = localStorage.getItem("commentsText");
commentsText.oninput = () => {
  localStorage.setItem("commentsText", commentsText.value);
};

commentsDate.value = localStorage.getItem("commentsDate");
commentsDate.oninput = () => {
  localStorage.setItem("commentsDate", commentsDate.value);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Валидация формы
  if (!commentsName.value) {
    errorName.classList.add("actived");
    commentsName.onfocus = () => errorName.classList.remove("actived");
  } else if (commentsText.value.length < 5 && commentsName.value) {
    errorText.classList.add("actived");
    commentsText.onfocus = () => errorText.classList.remove("actived");
  } else {
    // если все ок, добавляем коммент
    commentsList.insertAdjacentHTML(
      "afterbegin",
      `<div class="coment__block">
      <div class="comment_item">
      <div class="comment_info">
      <svg width="20" height="35" viewBox="0 0 26.020853 20.799076" xmlns="http://www.w3.org/2000/svg" class="svg_like" id="svg_like">
  <path d="m 1.7952743,1.7234655 c 2.3937,-2.29795401 6.26159,-2.29795401 8.6552797,0 l 2.5598,2.45748 2.5599,-2.45748 
      c 2.3937,-2.29795401 6.2616,-2.29795401 8.6554,0 2.3936,2.29795 2.3936,6.01111 0,8.3091095 l -11.2153,10.7665 
      -11.2150797,-10.7665 c -2.39369904,-2.2979995 -2.39369904,-6.0111595 0,-8.3091095 z m 6.88751,1.69705 c -1.41738,
      -1.36069 -3.70235,-1.36069 -5.11975,0 -1.41738,1.36069 -1.41738,3.55427 0,4.91502 l 9.4473197,9.0694395 9.4475,
      -9.0694395 c 1.4174,-1.36075 1.4174,-3.55433 0,-4.91502 -1.4174,-1.36069 -3.7024,-1.36069 -5.1197,0 l -4.3278,4.15458 z"
      
      fillRule="evenodd"
      clipRule="evenodd" />
  <path d="M 7.7304052,12.678189 C 1.900041,7.078087 2.1557048,7.3490596 1.8320586,6.4266572 1.6769744,5.9846617 
      1.6714622,5.9465614 1.6705366,5.3102305 1.6697134,4.7442198 1.6845808,4.6036397 1.7760799,4.3122514 2.2282189,2.8723671 
      3.3830955,1.8642309 4.8801033,1.6026298 5.9453098,1.4164857 7.1566675,1.719301 7.9788469,2.3772542 c 0.157776,0.126261 
      1.3451794,1.2467522 2.6386741,2.4899803 1.293496,1.2432282 2.370279,2.2604148 2.392851,2.2604148 0.02258,0 1.139958,
      -1.0553778 2.483076,-2.3452838 1.343116,-1.2899061 2.554482,-2.4218587 2.691924,-2.5154505 0.370101,-0.2520211 
      0.764497,-0.4393935 1.213282,-0.5764152 0.35883,-0.1095565 0.469331,-0.1219155 1.081209,-0.1209282 0.605706,9.774e-4 
      0.726002,0.014554 1.081211,0.1220279 1.272568,0.3850349 2.219743,1.2740407 2.634096,2.4723261 0.112002,0.3239122 
      0.141192,0.4931478 0.159222,0.9231827 0.01302,0.3105144 -1.82e-4,0.6544103 -0.03218,0.8381581 -0.106527,0.6117182 
      -0.434337,1.2863273 -0.851182,1.7516606 -0.27,0.3014081 -10.41456,10.037187 -10.458622,10.037187 -0.02146,0 -2.398353,
      -2.266167 -5.2819973,-5.035925 z"
       />
</svg>

      <div class="comment_name"></div>
      <div class="comment_date"></div>
      <button class="remove-button" id="remove-button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg_trash">
      <path d="M23 4.5C23 3.67158 22.3285 3 21.5 3H17.724C17.0921 1.20736 15.4007 0.00609375 13.5 0H10.5C8.59928 0.00609375 6.90789 1.20736 6.27602 3H2.5C1.67158 3 1 3.67158 1 4.5C1 5.32842 1.67158 6 2.5 6H3.00002V18.5C3.00002 21.5376 5.46245 24 8.5 24H15.5C18.5376 24 21 21.5376 21 18.5V6H21.5C22.3285 6 23 5.32842 23 4.5ZM18 18.5C18 19.8807 16.8807 21 15.5 21H8.5C7.1193 21 6.00002 19.8807 6.00002 18.5V6H18V18.5Z"/>
      <path d="M9.5 18C10.3284 18 11 17.3284 11 16.5V10.5C11 9.67158 10.3284 9 9.5 9C8.67158 9 8 9.67158 8 10.5V16.5C8 17.3284 8.67158 18 9.5 18Z"/>
      <path d="M14.5 18C15.3284 18 16 17.3284 16 16.5V10.5C16 9.67158 15.3284 9 14.5 9C13.6716 9 13 9.67158 13 10.5V16.5C13 17.3284 13.6716 18 14.5 18Z"/>
      </svg>
      </button>
      </div>
      <div class="comment_text"></div>
      </div>
      </div>`
    );

    // переменные комментариев

    let comment = document.querySelector(".comment_item");
    let commentName = document.querySelector(".comment_name");
    let commentText = document.querySelector(".comment_text");
    let commentDate = document.querySelector(".comment_date");
    let removeBtn = document.getElementById("remove-button");
    let likeBtn = document.getElementById("svg_like");

    let setCommentDate = function formatCommentDate() {
      let date = commentsDate.value;
      let dateYear = String(date.split("-").reverse().slice(2)).slice(2);
      let dateMon = date.split("-").slice(-2);
      let formatDate = dateMon.reverse().join(".") + "." + dateYear;

      return formatDate;
    };

    // добавляем коммент

    commentName.innerHTML = commentsName.value;
    commentText.innerHTML = commentsText.value;
    commentDate.innerHTML = !commentsDate.value
      ? commentsCurrentDate(new Date())
      : setCommentDate() + " " + commentsTime(new Date());

    localStorage.setItem("commentName", commentName);
    localStorage.setItem("commentText", commentText);
    localStorage.setItem("commentDate", commentDate);

    // ставим лайк

    likeBtn.addEventListener("click", (event) => {
      event.preventDefault();

      likeBtn.classList.toggle("active");
    });

    // удаляем коммент

    removeBtn.addEventListener("click", (event) => {
      event.preventDefault();

      comment.remove();
      removeBtn.remove();
    });

    localStorage.removeItem("commentsName");
    localStorage.removeItem("commentsText");
    localStorage.removeItem("commentsDate");
    commentsName.value = "";
    commentsText.value = "";
    commentsDate.value = "";
  }
});
