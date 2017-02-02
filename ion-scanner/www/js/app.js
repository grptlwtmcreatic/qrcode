// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

                     

.controller('addProduct', function($scope){

   $(document).ready(function(){

              $('#change').click();

              $('#change').on('click', function(event) {
                  $("#reader").html5_qrcode_changeCamera();
                /* Act on the event */
              });

              $('#reader').html5_qrcode(function(data){
            
                  $('#read').html(data);
                  $read = data;
                  id_qr_code = $read.replace("http://quai-lab.com/?pr_inventory=product&pr_qrcode=", "");
                  var idq = id_qr_code;
                  $('input[type=hidden]').val(idq);
                  $('#id_qr_code1').html(idq);

              },
                  function(error){
                      $('#read_error').html(error);
                  }, 
                  function(videoError){
                         $('#vid_error').html(videoError);
                  }
              );

  });
      
      
})

        



.controller('Scanctrl', function($scope){


      $(document).ready(function(){
          

          $('#reader').html5_qrcode(function(data){
              $('#read').html(data);
               $read = data;
              jQuery("#read").attr('href', $read);
              $read = $read.replace("product", "quickview");

                  $.getJSON($read, function(data) {
                      $('#title').html(data.title);
                      $img = data.img;
                      jQuery('#quickview').attr('src', $img);

                      
                      $("#read").removeClass('disabled');
                      $("#change").removeClass('disabled');

                });

          },
                    
            
                    function(error){
                        $('#read_error').html(error);
                    }, 
                    function(videoError){
                        $('#vid_error').html(videoError);
                    }
          );

              $('#change').on('click', function() {
                      $("#reader").html5_qrcode_changeCamera();
              });

              $("#read").on('click', function() {
                      $("#reader").html5_qrcode_stop();
                      $("#change").addClass('disabled');
              });
     });

      
})

//http://quai-lab.com/?pr_inventory=product&pr_qrcode=584e5ff437551
//

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home',{ url:'/home', templateUrl:'views/home.html'})

  .state('Saisir',{ url:'/Saisir', templateUrl:'views/Saisir.html', controller:'addProduct'})

  .state('photo',{ url:'/photo', templateUrl:'views/photo.html', controller:'Prendrephoto'})

  .state('Scan',{ url:'/Scan', templateUrl:'views/Scan.html', controller: 'Scanctrl'})
  ;
  $urlRouterProvider.otherwise('/home');
})
