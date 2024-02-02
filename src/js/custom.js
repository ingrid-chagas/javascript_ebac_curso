// instancia jquery e evita conflitos
// jQuery( function($){
   $(document).ready(function(){

      // $(".slider").not('.slick-initialized').slick();
      $('.multiple-items').slick({
         infinite: true,
         slidesToShow: 3,
         slidesToScroll: 3,
         arrows: true,
         dots: true
       });
   
      // $('.slider .featured-item').slick({
      //    dots: true,
      //    infinite: true,
      //    speed: 300,
      //    slidesToShow: 4,
      //    slidesToScroll: 4,
      //    responsive: [
      //      {
      //        breakpoint: 1024,
      //        settings: {
      //          slidesToShow: 3,
      //          slidesToScroll: 3,
      //          infinite: true,
      //          dots: true
      //        }
      //      },
      //      {
      //        breakpoint: 600,
      //        settings: {
      //          slidesToShow: 2,
      //          slidesToScroll: 2
      //        }
      //      },
      //      {
      //        breakpoint: 480,
      //        settings: {
      //          slidesToShow: 1,
      //          slidesToScroll: 1
      //        }
      //      }
      //      // You can unslick at a given breakpoint now by adding:
      //      // settings: "unslick"
      //      // instead of a settings object
      //    ]
      //  });
      
      let titulos = $('h4') // tag
      
      let itens = $('.featured-item') // class
      
      let destaques = $('#featured') // id
      
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
      
      
      /*
      * Manipulação de eventos
      */
      
      //abrir e fechar o menu responsivo
      //podia ser toggle ao inves de show e hide
      $('.navbar-toggler').click(function(){
         if($('.navbar-toggler').attr('aria-expanded') === "false"){
            $('#navbarResponsive').show();
            $("button").attr("aria-expanded","true");
         } else{
            $('#navbarResponsive').hide();
            $("button").attr("aria-expanded","false");
         }
      });
   
      
      
      /*
       * Ouvinte de eventos .nav-modal-open
       */
      $('.nav-modal-open').on('click', function(e){
   
         e.preventDefault();
   
         let elem = $(this).attr('rel');
   
         $('.modal-body').html($('#'+elem).html());
         
         $('.modal-header h5.modal-title').html($(this).text());
   
         let myModal = new bootstrap.Modal($('#modelId'));
   
         myModal.show();
   
      })
      
   
      /*
       * TODO: incrementar a validação
       * - checar se o nome é válido (mais de 2 caracteres)
       * - checar se o email é válido com ao menos um "@" e "."
       * - checar se o cpf é válido com regex
       */
      function validate( elem ){
         const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
         const cpfValido = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
         if(elem.attr('name')=='nome' && elem.val().length <3) {
            elem.addClass('invalid');
            elem.parent().find('.text-muted').show();
   
         }  else if(elem.attr('name')=='email' && !emailValido.test(elem.val())){
            elem.addClass('invalid');
            elem.parent().find('.text-muted').show();
         
         } else if(elem.attr('name')=='cpf' && !cpfValido.test(elem.val())){
            elem.addClass('invalid');
            elem.parent().find('.text-muted').show();
   
         } else if(elem.attr('name')=='phone' && elem.val()==''){
            elem.addClass('invalid');
            elem.parent().find('.text-muted').show();
   
         } 
         // else if( elem.val() == '') {
         //    console.log('o campo de '+ elem.attr('name') + ' é obrigatório');
         //    elem.addClass('invalid');
         //    return false;
   
         // } 
         else {
            elem.parent().find('.text-muted').hide();
            elem.removeClass('invalid');
         }
      }
   
      // alerta
      function msg(alerta, texto) {
         var resposta = '';
         $("#resposta").empty();
         if (alerta === 'atencao') {
            resposta = "<div class='alert btn-warning text-center' role='alert'>" +
               "<a href='#' class='close' data-dismiss='alert' aria-label='Close'>&times;</a>" +
               texto + "</div>";
         }
   
         $("#resposta").append(resposta);
   
         $(".alert").click(function() {
            $(".alert").hide();
         });
      }
   
      $("#item1").click(function() {
         msg('atencao', 'Este produto está temporariamente ESGOTADO!!');
      });
   
   
      $('body').on('submit', '.modal-body .form', function(e){
   
         e.preventDefault();
   
         const inputName = $('#nome');
         const inputEmail = $('#email');
         const inputCpf = $('#cpf');
         const inputPhone = $('#phone');
   
         validate(inputName);
         validate(inputEmail);
         validate(inputCpf);
         validate(inputPhone);
   
         if(inputEmail.hasClass('invalid') || inputName.hasClass('invalid')){
   
            $(".toast").toast("show");
            $('#myModal').on('shown.bs.modal', function() {
               $('#btn-enviar').scrollTop(-10); 
           });
   
            console.log('verificar campos obrigatórios');
            return false;
         } else {
            $(".toast").toast("hide");
            $(this).submit();
         }
   
      });
   
      $('body').on('blur', '#nome', function(){
         validate($(this));
      })
   
      $('body').on('blur', '#email', function(){
         validate($(this));
      });

      $('body').on('focus', '#date', function(){
         $(this).datepicker({ 
            format: 'dd/mm/yyyy',
            language: "pt-BR",
            autoclose: true
         })
         // $(this).datepicker();
      })
   
      $('body').on('blur', '#date', function(){
         validate($(this))
         $(this).mask('00/00/0000');
      }) 
   
      $('body').on('blur', '#time', function(){
         validate($(this))
         $(this).mask('00:00');
      })
   
      $('body').on('blur', '#cep', function(){
         validate($(this))
         $(this).mask('00000-000');
      })
   
      $('body').on('blur', '#phone', function(){
         validate($(this))
         $(this).mask('00000-0000');
      })
   
      $('body').on('blur', '#cpf', function(){
         validate($(this))
         $(this).mask('000.000.000-00');
      })
   })