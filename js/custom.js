// instancia jquery e evita conflitos
// jQuery( function($){
$(document).ready(function(){

   //alteracao carrossel responsivo
   $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
              nav:false
          },
          600:{
              items:3,
              nav:false
          },
          1000:{
              items:5,
              nav:false,
              loop:false
          }
      }
   });

   let titulos = $('h4') // tag

   let itens = $('.featured-item') // class
   
   let destaques = $('#featured') // id

   console.log(titulos.first());

   // Configuração de produtos

   $('.featured-item a').addClass('btn btn-dark stretch-link');

   $('.featured-item:first h4').append('<span class="badge bg-secondary">Novo</span>')
   // $('.featured-item:first h4').start('<span class="badge bg-secondary">Novo</span>')
   // $('.featured-item:first h4').html('<span class="badge bg-secondary">Novo</span>')
   // $('.featured-item:first h4').addClass('active')
   // $('.featured-item:first h4').removeClass('active')
   // $('.featured-item:first h4').toggleClass('active')
   // $('.featured-item:first h4').hide()
   // $('.featured-item:first h4').show()
   // $('.featured-item:first h4').fadeIn(2000)
   // $('.featured-item:first h4').fadeOut()

   //alteracao layout botao buscar
   $('.btn-outline-success').css({
      'color': '#3a8bcd',
      'background-color': '#fff',
      'border-color': '#3a8bcd'
   });

   $('.btn-outline-success').hover(function(){
      $(this).css({
      'color': '#fff',
      'background-color': '#3a8bcd',
      'border-color': '#3a8bcd'
      })
   });
   
   $('.btn-outline-success').mouseout(function(){
      $(this).css({
      'color': '#3a8bcd',
      'background-color': '#fff',
      'border-color': '#3a8bcd'
      })
   });
   $('.featured-item h4').dblclick( function(){
      $(this).css({
         'color': '#f00',
         'background': '#ff0',
         'font-weight': '100',
      });
   });

   /*
   * Manipulação de eventos
   */
   $('.featured-item a').on('blur', function(event){

      event.preventDefault();

      alert('Produto esgotado');

   });
   
   //abrir e fechar o menu responsivo
   $('.navbar-toggler').click(function(){
      if($('.navbar-toggler').attr('aria-expanded') === "false"){
         $('#navbarResponsive').show();
         $("button").attr("aria-expanded","true");
      } else{
         $('#navbarResponsive').hide();
         $("button").attr("aria-expanded","false");
      }

   });
})
