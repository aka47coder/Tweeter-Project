
const initForm = function(){
    $( "#form" ).submit(function( event ) {
        var saveData = $.ajax({
            type: 'POST',
            url: "/tweets",
            data: $(this).serialize(),
            dataType: "text",
            success: function(resultData) { 
                $('#tweet-text').val(''); 
                $(tweets).html('');                
                initTweets();
            }
        });
      event.preventDefault();
      });
}

const initTweets = function(){
   loadTweets();    
}

const loadTweets=function () {    
    $.get( "/tweets", function( data ) {       
        renderTweets(data);
      });
}

const escapevalue = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

const renderTweets = function(tweets) {
  tweets.forEach(createTweetElement);   
  timeago.render(document.querySelectorAll('.need_to_be_rendered'));    
}

let createTweetElement = function(user) {  
 
  let $tweet = `
  <article>
          <theader>
            <div class="name">  
            <img src="`+escapevalue(user.user.avatars)+`"> 
              <span> `+escapevalue(user.user.name)+`</span>
            </div>
            <div class = "user_id"><span>`+escapevalue(user.user.handle)+`</span></div>
            </theader>
          <div>`+escapevalue(user.content.text)+`</div>
          <tfooter>
          <div class="date">${timeago.format(user.created_at)}</div>
            <div class="icons w3-small">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </tfooter>
        </article>`;
        $('#tweets').prepend($tweet);        
}