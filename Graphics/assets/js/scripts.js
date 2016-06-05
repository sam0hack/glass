jQuery( document ).ready( function( $ ) {
"use strict";
  
  var $main = $( '#spaces-main' ),
  $pages = $main.children( 'section.page-section' ),
  $iterate = $( '#iterateEffects' ),
  animcursor = 32,
  pagesCount = $pages.length,
  current = 0,
  isAnimating = false,
  endCurrPage = false,
  endNextPage = false,
  animEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  },
  // animation end event name
  animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
  // support css animations
  support = Modernizr.cssanimations;
  

  //animate_home();
  
  function animate_home(){
    $('.metro-panel .large-4').each(function( index ) {
      $(this).removeClass('fadeInRightBig');
      $(this).hide();
      $('.copyright').hide();
      var that = this;
        setTimeout(function() {
          $(that).show();
          $(that).addClass('animated animate');
          $(that).addClass('fadeInRightBig');
          $('.copyright').delay(1500).fadeIn( "slow" );
         }, (1+index) * 100);
    });
  } 
  
  function hide_home(){
    $('.metro-panel .large-4').each(function( index ) {
      $(this).hide();
    });
  }
  
  function animate_menu(){
    $('.vertical-menu > *').addClass('fadeInRight');
  } 
   
  function toogle_menu(){    
    if( $('.vertical-menu').hasClass('close')){
      $('.vertical-menu').removeClass('close');
    }else{
      $('.vertical-menu').addClass('close');
    }
  }
   
  function open_menu(){    
    if( $('.vertical-menu').hasClass('close')){
      $('.vertical-menu').removeClass('close');
    }
  }
   
  function close_menu(){
    $('.vertical-menu').addClass('close');
  }
  
  
  if(window.location.hash && window.location.hash != '#home') {
    setTimeout(function() {
      locationHashChanged();
    }, 1000);
  }else{
    hide_home();
    setTimeout(function() {
      animate_home();
    }, 700);
  }


  
  $('.projects-slider ul').responsiveSlides({
    nav: true,
    maxwidth: '400',
    timeout: 3000,
    prevText: "",
    nextText: "",
    }); 
   
  $('.project-images ul').responsiveSlides({
    nav: true,
    prevText: "",
    nextText: "",
  });
  
  $('.wd-tweets ul').responsiveSlides({
    nav: true,
    timeout: 4000,
    prevText: "",
    nextText: "",
    before: function(){
      $('.wd-tweets ul li').addClass('animated');
      $('.wd-tweets ul li').addClass('fadeInUp'); 
    },   // Function: Before callback
    after: function(){
      
      $('.wd-tweets ul li').removeClass('fadeInUp'); 
    } 
  });
  
  
  // add inline-list calss to Skills fields in project page
  $('.field-name-field-skills ul.links').addClass('inline-list');
  
  
  
  $('.portfolio-item').hover(function() {
        var $this = $(this);
        if(Modernizr.csstransitions) {
            $('.plus-icon', $this).addClass('animated');
            $('.plus-icon', $this).css('display', 'block');
            $('.plus-icon', $this).removeClass('flipOutX'); 
            $('.plus-icon', $this).addClass('flip'); 
            
            $('figcaption h3', $this).addClass('animated');
            $('figcaption h3', $this).removeClass('fadeOutUp'); 
            $('figcaption h3', $this).addClass('fadeInDown'); 
        }else{
            $('.plus-icon', $this).stop(true, false).fadeIn('fast');
        }
    }, function() {
        var $this = $(this);
        if(Modernizr.csstransitions) {
            $('.plus-icon', $this).removeClass('flip'); 
            $('.plus-icon', $this).addClass('flipOutX');
            $('.plus-icon', $this).css('display', 'none');
            $('.plus-icon', $this).removeClass('animated');
            
            $('figcaption h3', $this).removeClass('fadeInDown'); 
            $('figcaption h3', $this).addClass('fadeOutUp'); 
            $('.plus-icon', $this).removeClass('animated');
        }else{
            $('.plus-icon', $this).stop(true, false).fadeOut('fast');
        }
    });
    
  
  $('.testimonials').responsiveSlides();
  
  
  $.fn.after_ajax =  function() {
    $('.project-images ul').responsiveSlides({
    nav: true,
    prevText: "",
    nextText: "",});
  };
  
   
  $(document).on("click", "#project-info .back", function(){ 
    $(this).parent().parent().hide(500);
    $(this).parent().html('<i class="icon-remove back"></i>');
  });  
      
   
  $('.vertical-menu > *').addClass('animated');
  
  $('.showMenu').on( 'click', function() {    
    toogle_menu();
    
    if( $(this).hasClass('fadeInRight') ){
        $('.vertical-menu > *').removeClass('fadeInRight');
    }else{
      setTimeout(function() {
        animate_menu();
       }, 70);
    }
    
    if( $(this).hasClass('search') ){
      $('.vertical-menu .form-item-search-block-form input').focus();

    }    
  }); 
  
  $('.vertical-menu').hover(    
    function() {
      open_menu();
    },
    function() {
      close_menu();
    });  
  
  function locationHashChanged() { 
    var pagesClasses = new Array();
    $.each( $pages, function(ind, itm){
      var classList = itm.className.split(/\s+/);
      var sectionclass = classList[1].replace('-page','');
      pagesClasses.push( sectionclass );
    });
    
    var hash = 'home';
    if(window.location.hash) {
      hash = window.location.hash.substring(1);
    }  
    
    var hashIndex = jQuery.inArray( hash, pagesClasses );     
    if( hashIndex !== -1 ) {
      nextPage( animcursor, hashIndex );
      
      close_menu();
      if( hash == 'home'){
        hide_home();
        setTimeout(function() {
          animate_home();
        }, 50);
      }
      
      // blog entries animation
      //if( hash == 'blog') {
        $(".blog-page.page-section-current li article").delay(220).queue(function(n) {
            $(this).addClass('animated bounceInRight');
            n();
            setTimeout(function() {
              $(".blog-page.page-section-current li article").removeClass('animated bounceInRight');
            }, 2000);
        });
      //}
    };
  }
  window.onhashchange = locationHashChanged;
  


  function init() {

    $pages.each( function() {
      var $page = $( this );
      $page.data( 'originalClassList', $page.attr( 'class' ) );
    } );

    $pages.eq( current ).addClass( 'page-section-current' );

    $iterate.on( 'click', function() {
      var $pageindex = 0;
      if( isAnimating ) {
        return false;
      }
      if( animcursor > 67 ) {
        animcursor = 1;
      }
      nextPage( animcursor );
      ++animcursor;
    } );
    
    $('.goto').on( 'click', function() {
      if( isAnimating ) {
        return false;
      }      
      $pageindex = $(this).data('pageindex');      
      if( current != $pageindex ){        
        nextPage( animcursor, $(this).data('pageindex') );
      }
      
      // add active class to active menu item
      $('.vertical-menu .menu-list li a').each(function(i,j){
        if( $pageindex == $(this).data('pageindex') ){
          $(this).addClass("active");
        }else{
          $(this).removeClass("active");
        }
      });
      
      // space animation
      if( $pageindex == 0 ) {        
        $('.space').queue(function(n) {
          $(this).addClass('animated bounceInRight');
          n();
          setTimeout(function() {
            $(".space").removeClass('animated bounceInRight');
          }, 200);
        });
      }
      
    } );    

  }

  function nextPage( animation, cur) {

    if( isAnimating ) {
      return false;
    }

    isAnimating = true;
    
    var $currPage = $pages.eq( current );
    
    if(typeof cur == 'undefined'){
      current = 0;
    }else{
      current = cur;
    }
    
    var $nextPage = $pages.eq( current ).addClass( 'page-section-current' );
    
    var outClass = '', inClass = '';

    switch( animation ) {

      case 1:
        outClass = 'pt-page-moveToLeft';
        inClass = 'pt-page-moveFromRight';
        break;
      case 2:
        outClass = 'pt-page-moveToRight';
        inClass = 'pt-page-moveFromLeft';
        break;
      case 3:
        outClass = 'pt-page-moveToTop';
        inClass = 'pt-page-moveFromBottom';
        break;
      case 4:
        outClass = 'pt-page-moveToBottom';
        inClass = 'pt-page-moveFromTop';
        break;
      case 5:
        outClass = 'pt-page-fade';
        inClass = 'pt-page-moveFromRight pt-page-ontop';
        break;
      case 6:
        outClass = 'pt-page-fade';
        inClass = 'pt-page-moveFromLeft pt-page-ontop';
        break;
      case 7:
        outClass = 'pt-page-fade';
        inClass = 'pt-page-moveFromBottom pt-page-ontop';
        break;
      case 8:
        outClass = 'pt-page-fade';
        inClass = 'pt-page-moveFromTop pt-page-ontop';
        break;
      case 9:
        outClass = 'pt-page-moveToLeftFade';
        inClass = 'pt-page-moveFromRightFade';
        break;
      case 10:
        outClass = 'pt-page-moveToRightFade';
        inClass = 'pt-page-moveFromLeftFade';
        break;
      case 11:
        outClass = 'pt-page-moveToTopFade';
        inClass = 'pt-page-moveFromBottomFade';
        break;
      case 12:
        outClass = 'pt-page-moveToBottomFade';
        inClass = 'pt-page-moveFromTopFade';
        break;
      case 13:
        outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
        inClass = 'pt-page-moveFromRight';
        break;
      case 14:
        outClass = 'pt-page-moveToRightEasing pt-page-ontop';
        inClass = 'pt-page-moveFromLeft';
        break;
      case 15:
        outClass = 'pt-page-moveToTopEasing pt-page-ontop';
        inClass = 'pt-page-moveFromBottom';
        break;
      case 16:
        outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
        inClass = 'pt-page-moveFromTop';
        break;
      case 17:
        outClass = 'pt-page-scaleDown';
        inClass = 'pt-page-moveFromRight pt-page-ontop';
        break;
      case 18:
        outClass = 'pt-page-scaleDown';
        inClass = 'pt-page-moveFromLeft pt-page-ontop';
        break;
      case 19:
        outClass = 'pt-page-scaleDown';
        inClass = 'pt-page-moveFromBottom pt-page-ontop';
        break;
      case 20:
        outClass = 'pt-page-scaleDown';
        inClass = 'pt-page-moveFromTop pt-page-ontop';
        break;
      case 21:
        outClass = 'pt-page-scaleDown';
        inClass = 'pt-page-scaleUpDown pt-page-delay300';
        break;
      case 22:
        outClass = 'pt-page-scaleDownUp';
        inClass = 'pt-page-scaleUp pt-page-delay300';
        break;
      case 23:
        outClass = 'pt-page-moveToLeft pt-page-ontop';
        inClass = 'pt-page-scaleUp';
        break;
      case 24:
        outClass = 'pt-page-moveToRight pt-page-ontop';
        inClass = 'pt-page-scaleUp';
        break;
      case 25:
        outClass = 'pt-page-moveToTop pt-page-ontop';
        inClass = 'pt-page-scaleUp';
        break;
      case 26:
        outClass = 'pt-page-moveToBottom pt-page-ontop';
        inClass = 'pt-page-scaleUp';
        break;
      case 27:
        outClass = 'pt-page-scaleDownCenter';
        inClass = 'pt-page-scaleUpCenter pt-page-delay400';
        break;
      case 28:
        outClass = 'pt-page-rotateRightSideFirst';
        inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
        break;
      case 29:
        outClass = 'pt-page-rotateLeftSideFirst';
        inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
        break;
      case 30:
        outClass = 'pt-page-rotateTopSideFirst';
        inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
        break;
      case 31:
        outClass = 'pt-page-rotateBottomSideFirst';
        inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
        break;
      case 32:
        outClass = 'pt-page-flipOutRight';
        inClass = 'pt-page-flipInLeft pt-page-delay500';
        break;
      case 33:
        outClass = 'pt-page-flipOutLeft';
        inClass = 'pt-page-flipInRight pt-page-delay500';
        break;
      case 34:
        outClass = 'pt-page-flipOutTop';
        inClass = 'pt-page-flipInBottom pt-page-delay500';
        break;
      case 35:
        outClass = 'pt-page-flipOutBottom';
        inClass = 'pt-page-flipInTop pt-page-delay500';
        break;
      case 36:
        outClass = 'pt-page-rotateFall pt-page-ontop';
        inClass = 'pt-page-scaleUp';
        break;
      case 37:
        outClass = 'pt-page-rotateOutNewspaper';
        inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
        break;
      case 38:
        outClass = 'pt-page-rotatePushLeft';
        inClass = 'pt-page-moveFromRight';
        break;
      case 39:
        outClass = 'pt-page-rotatePushRight';
        inClass = 'pt-page-moveFromLeft';
        break;
      case 40:
        outClass = 'pt-page-rotatePushTop';
        inClass = 'pt-page-moveFromBottom';
        break;
      case 41:
        outClass = 'pt-page-rotatePushBottom';
        inClass = 'pt-page-moveFromTop';
        break;
      case 42:
        outClass = 'pt-page-rotatePushLeft';
        inClass = 'pt-page-rotatePullRight pt-page-delay180';
        break;
      case 43:
        outClass = 'pt-page-rotatePushRight';
        inClass = 'pt-page-rotatePullLeft pt-page-delay180';
        break;
      case 44:
        outClass = 'pt-page-rotatePushTop';
        inClass = 'pt-page-rotatePullBottom pt-page-delay180';
        break;
      case 45:
        outClass = 'pt-page-rotatePushBottom';
        inClass = 'pt-page-rotatePullTop pt-page-delay180';
        break;
      case 46:
        outClass = 'pt-page-rotateFoldLeft';
        inClass = 'pt-page-moveFromRightFade';
        break;
      case 47:
        outClass = 'pt-page-rotateFoldRight';
        inClass = 'pt-page-moveFromLeftFade';
        break;
      case 48:
        outClass = 'pt-page-rotateFoldTop';
        inClass = 'pt-page-moveFromBottomFade';
        break;
      case 49:
        outClass = 'pt-page-rotateFoldBottom';
        inClass = 'pt-page-moveFromTopFade';
        break;
      case 50:
        outClass = 'pt-page-moveToRightFade';
        inClass = 'pt-page-rotateUnfoldLeft';
        break;
      case 51:
        outClass = 'pt-page-moveToLeftFade';
        inClass = 'pt-page-rotateUnfoldRight';
        break;
      case 52:
        outClass = 'pt-page-moveToBottomFade';
        inClass = 'pt-page-rotateUnfoldTop';
        break;
      case 53:
        outClass = 'pt-page-moveToTopFade';
        inClass = 'pt-page-rotateUnfoldBottom';
        break;
      case 54:
        outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
        inClass = 'pt-page-rotateRoomLeftIn';
        break;
      case 55:
        outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
        inClass = 'pt-page-rotateRoomRightIn';
        break;
      case 56:
        outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
        inClass = 'pt-page-rotateRoomTopIn';
        break;
      case 57:
        outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
        inClass = 'pt-page-rotateRoomBottomIn';
        break;
      case 58:
        outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
        inClass = 'pt-page-rotateCubeLeftIn';
        break;
      case 59:
        outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
        inClass = 'pt-page-rotateCubeRightIn';
        break;
      case 60:
        outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
        inClass = 'pt-page-rotateCubeTopIn';
        break;
      case 61:
        outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
        inClass = 'pt-page-rotateCubeBottomIn';
        break;
      case 62:
        outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
        inClass = 'pt-page-rotateCarouselLeftIn';
        break;
      case 63:
        outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
        inClass = 'pt-page-rotateCarouselRightIn';
        break;
      case 64:
        outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
        inClass = 'pt-page-rotateCarouselTopIn';
        break;
      case 65:
        outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
        inClass = 'pt-page-rotateCarouselBottomIn';
        break;
      case 66:
        outClass = 'pt-page-rotateSidesOut';
        inClass = 'pt-page-rotateSidesIn pt-page-delay200';
        break;
      case 67:
        outClass = 'pt-page-rotateSlideOut';
        inClass = 'pt-page-rotateSlideIn';
        break;

    }

    $currPage.addClass( outClass ).on( animEndEventName, function() {
      $currPage.off( animEndEventName );
      endCurrPage = true;
      if( endNextPage ) {
        onEndAnimation( $currPage, $nextPage );
      }
    } );

    $nextPage.addClass( inClass ).on( animEndEventName, function() {
      $nextPage.off( animEndEventName );
      endNextPage = true;
      if( endCurrPage ) {
        onEndAnimation( $currPage, $nextPage );
      }
    } );

    if( !support ) {
      onEndAnimation( $currPage, $nextPage );
    }

    // hide the menu bar after passing to new page
    toogle_menu();
  }

  function onEndAnimation( $outpage, $inpage ) {
    endCurrPage = false;
    endNextPage = false;
    resetPage( $outpage, $inpage );
    isAnimating = false;
  }

  function resetPage( $outpage, $inpage ) {
    $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
    $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' page-section-current' );
  }

  init();

  return { init : init };

//})();


});