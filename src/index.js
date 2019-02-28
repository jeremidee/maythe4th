'use strict'

import style from './css/style.css';
import anime from "animejs"
import "./js/import-jq"
import Swal from "sweetalert2"
import 'scrollmagic'


$(function () {

    $('.down').on('click', function(event) {

        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
    
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        } 
    });
    


    let ques1 = document.getElementById('ques1');
    let ques2 = document.getElementById('ques2');
    let ques3 = document.getElementById('ques3');
    let ques4 = document.getElementById('ques4');
    let ques5 = document.getElementById('ques5');
    let ques6 = document.getElementById('ques6');
    let ques7 = document.getElementById('ques7');
    let ques8 = document.getElementById('ques8');
    let ques9 = document.getElementById('ques9');
    let ques10 = document.getElementById('ques10');
    let confirm = document.getElementById('confirm');
    let questions = [ques1, ques2, ques3, ques4, ques5, ques6, ques7, ques8, ques9, ques10, confirm];
    let body = document.querySelector('body');


    // var bgImageArray = ["bg1_wide.8488ab33.jpg", "bg2.167b92b4.jpg", "bg3.ad180308.jpg", "bg4.5b71227f.jpg"],
    //     secs = 4;
    // bgImageArray.forEach(function(img){
    //   new Image().src = img;
    //   // caches images, avoiding white flash between background replacements
    // });
    // function backgroundSequence() {
    //   window.clearTimeout();
    //   let k = 0;
    //   for (let i = 0; i < bgImageArray.length; i++) {
    //     setTimeout(function(){
    //       body.style.background = "url(" + bgImageArray[k] + ") no-repeat center center";
    //       body.style.backgroundSize ="cover";
    //       if ((k + 1) === bgImageArray.length) {
    //         setTimeout(function() { backgroundSequence() }, (secs * 1000))
    //       } else {
    //         k++;
    //       }
    //     }, (secs * 1000) * i)
    //   }
    // }
    // backgroundSequence();

    let currentStatus = 0;

    function hideQ() {
        let restQuestions = questions.filter(function (item, index, Array) {
            return index !== (currentStatus - 1);
        });
        anime({
            targets: restQuestions,
            during: '200ms',
            easing: 'easeInOutQuad',
            bottom: '-100%',
            opacity: 0,
            complete: function () {
                for (let i = 0; i < restQuestions.length; i++) {
                    restQuestions[i].style.display = 'none'
                }
            }
        });
        if (currentStatus == 1) {
            $('.prev-q').fadeOut();
        }
    }

    function showQ(target, status) {
        anime({
            targets: target,
            during: '200ms',
            easing: 'easeInOutQuad',
            bottom: 0,
            opacity: 1,
            begin: function () {
                console.log(target)
                target.style.display = 'flex'
            }
        });
        currentStatus = status;
        console.log(currentStatus);
        if (currentStatus == 11) {
            $('.next-q').fadeOut();
        }
    }

    function formAlert(text) {
        Swal.fire({
            title: 'Oops!',
            text: text,
            type: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#715446'
        })
    }

    $('#initButton').on('click', function () {
        showQ(ques1, 1);
        let t1 = anime.timeline({
            easing: 'easeInOutCirc',
            during: '300ms',
            update: function () {
                $('#initButton').fadeOut();
            },
            complete: function () {
                $('.next-q').fadeIn();
            },
        });
        t1
            .add({
                targets: '.title',
                translateY: '-130%',
            })
            .add({
                targets: '.j-sign',
                bottom: 'initial',
                top: '20px'
            }, 0);
    });
    $('[name="entry.1793524809"]').on('change', function () {
        if ($('#veget').prop('checked')) {
            $('#vegetSum').fadeIn();
        } else {
            $('#vegetSum').fadeOut();
        }
    });

    $('.next-q').on('click', function () {
        switch (currentStatus) {
            case 1:

                if ($('#ques1 input').val() == '') {
                    formAlert('請記得填寫姓名，不然我們不知道你是誰唷！');
                    return false;
                }

                showQ(ques2, 2);
                hideQ();
                $('.prev-q').fadeIn();

                break;
            case 2:
                ($('#ques2-radio01').prop('checked')) ? showQ(ques3, 3): showQ(ques9, 9);
                hideQ();
                break;

            case 3:
                ($('#ques3-radio01').prop('checked') || $('#ques3-radio03').prop('checked')) ? showQ(ques4, 4): showQ(ques6, 6);
                hideQ();
                body.classList.add('bg2');

                break;
            case 4:
                if ($('#ques4 input').val() == '') {
                    formAlert('請填寫出席人數喔！');
                    return false;
                }
                showQ(ques5, 5);
                hideQ();
                break;
            case 5:
                showQ(ques6, 6);
                hideQ();
                body.classList.add('bg3');

                break;
            case 6:
                showQ(ques7, 7);
                hideQ();
                break;
            case 7:
                ($('#ques7-radio01').prop('checked')) ? showQ(ques8, 8): showQ(ques9, 9);
                hideQ();
                body.classList.add('bg4');
                break;
            case 8:
                if ($('#ques8 input').val() == '') {
                    formAlert('請記得填寫地址，以防我炸到別人家啦！');
                    return false;
                }
                showQ(ques9, 9);
                hideQ();
                break;
            case 9:
                if ($('#ques9 input').val() == '') {
                    formAlert('那個，我們需要你的聯絡方式，才能提供詳細資訊給你啊！');
                    return false;
                }
                showQ(ques10, 10);
                hideQ();
                break;
            case 10:
                showQ(confirm, 11);
                hideQ();

            default:
                0
                break;
        }
    });


    $('.prev-q').on('click', function () {
        let prevQuestion = questions.filter(function (item, index, Array) {
            return index == (currentStatus - 2);
        });
        console.log(prevQuestion);
        showQ(prevQuestion[0], (currentStatus - 1));
        hideQ();
    });

    let submitted = false;
    $('.form').on('submit',function(){
        submitted = true;
    });
    $('#hidden_result').on('load',function(){
      if(submitted)  {
        console.log('ok');
        window.location='./result.html';
      }
    });

});
