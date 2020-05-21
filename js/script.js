jQuery(document).ready(function ($) {
    var i = 0;
    var txt = 'This page is loading please wait.';
    var speed = 50;
  
    function typeWriter() {
      if (i < txt.length) {
        let elem = document.getElementById("demo");
        elem.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
        if(elem.innerHTML === txt){
          setTimeout(() => {
            elem.innerHTML = '';
          }, 1000);
        }
      }
    }
      typeWriter();

      
        setTimeout(function() {
        $('body').css('background-image','url(/images/Old-Books-on-Shelves.jpeg)');
        
        document.getElementById('something').classList.remove("hiddenform");
        // document.getElementById('something').classList.add("formDiv");
        //when the document is ready the getelement is method of the document returns the element of the
        //page and the class list returns you can add ans remvoe things out.
        //document.getElementById('submit').classList.remove("hiddenform");
    },2000);
   

      $( "#loader" ).delay(1000).fadeOut(400, function(){
        $( "#your-page" ).fadeIn(600);
    });
   
    function submitForm() {
        document.getElementById("customForm").submit()
    }

    document.getElementById('submit').onclick = function() {
        setTimeout(submitForm, 3000); 
    }

      function createBookListItem(Book) {
        var $li = $("<li>"); //<li></li>
        $li.addClass("list-group-item hover-invert cursor-pointer"); //<li class="list-group-item"></li>
        $li.html(Book.title); //<li class="list-group-item">{TEXT}</li>
        $li.data("BookId", Book.id);
        return $li;
      }
    
      var request = axios.get("http://csc225.mockable.io/books");
    
      request.then(function (response) {
        response.data.forEach(function (Book) {
          // $('#book-list-loader').html('it is loading please wait');
          $("#book-list-loader").attr("style", "display:none");
         
          //$('#').html('it is loading please wait');
          // <img src="" alt="" width="" height="" aria-label="" key="" style=""></img>
          // $('#movie-list').append(createMovieListItem(movie.title));
          $("#book-list").append(createBookListItem(Book));
          // first '<li class="list-group-item">Goodfellas</li>'
          // second '<li class="list-group-item">Goodfellas</li><li class="list-group-item">The Empire Strikes Back</li>'
          // third....
        });
        $(".list-group-item").on("click", function () {
          $("#card-container").attr("style", "display:block;width:18rem;");
          $(".list-group-item").removeClass("active");
          var BookId = $(this).data("BookId");
          $(this).addClass("active");
          // $('#cover').html('loading....');
    
          axios.get(" http://csc225.mockable.io/books/" + BookId)
          .then(function (response) {
              console.log(response);
              $("#book-meta-loader").attr("style", "display:none;");
              //var book=response.data;
              var $img = $("<img>")
                .attr("class", "card-img-top")
                .attr("src", response.data.cover)
                .attr("alt", response.data.title);
              // var $link = $('a').attr('href',response.data.link);
    
              console.log(response.data);
              $("#cover").html($img);
              $("#pages").html(`Pages: ${response.data.pages}`);
              $("#title").html(`Title: ${response.data.title}`);
              $("#author").html(`Author: ${response.data.author}`);
              $("#year").html(`Year: ${response.data.year}`);
              $("#country").html(`Country: ${response.data.country}`);
              $("#language").html(`Language': ${response.data.language}`);
              $("#id").html(`the ID : ${response.data.id}`);
              $("#link").html(response.data.link);
            })
            .catch((err) => console.log(err));
        });
      });
      console.log("it loaded fine ");
      // var content = createMovieListItem('testing');
      // $('#movie-list').html(content);
    });