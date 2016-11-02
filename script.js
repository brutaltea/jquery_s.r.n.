 $(document).ready(function () {
    $.getJSON('http://demo3340210.mockable.io/api/products/?format=json', function (data) {
        for (var i = 0; i < data.products.length; i++) {
        $("#renderList").append('<li role="presentation"><a class="btn btn-default itemSelector" >'+data.products[i].title+'</a></li>');
        }
        $(".itemSelector").click(function () {
                var index = $(".itemSelector").index(this);
                $("#renderHere").html(
                    '<div class="row"><div class="col-xs-12"><h1>' + data.products[index].title +
                    '</h1></div></div><div class="row"><div class="col-xs-6"><img src="' + data.products[index].img +
                    '" class="img-responsive"></img></div><div class="col-xs-6"><span>' + data.products[index].text +
                    '</span></div></div><div class="row"><div class="col-xs-12"><textarea placeholder="Write a comment here" class="form-control" rows="3"></textarea><div class="rating" data-rating-max="5"></div><select id="comrate"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select><div id="alert"></div><button type="button" id="post" class="btn btn-default btn-lg">Post a comment</button></div></div>'
                );                
                $('#comrate').barrating({
                    theme: 'fontawesome-stars-o'
                });
                $.getJSON('http://demo3340210.mockable.io/comments/'+index+'', function (data) {                    
                    for (var i = 0; i < data.comments.length; i++) {                    
                        $("#renderHere").append(
                            '<div class="row"><div class="col-xs-12"><div class="panel panel-default"><div class="panel-heading">' + data.comments[i].creator +
                            ' wrote:<div class="rating" data-rating-max="5" data-initial-rating="3"></div><select class="comrate"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div><div class="panel-body">' + data.comments[i].text +
                            '</div></div></div></div>');   
                $(function () {
                        $('.comrate').barrating({
                        theme: 'fontawesome-stars-o',
                        hoverState: false,
                        initialRating: 3
                        });
                    });
                }});
                $("#post").click(function(){
                    $("#alert").html('<div class="panel panel-danger"><div class="panel-body" >You must be logged in to post a comment!</div></div>');
                    $.ajax({
                        url: 'http://smktesting.herokuapp.com/api/reviews/1',
                        type: 'POST',
                        data: {
                            rate: 5,
                            text: "test"
                        }
                    });
                });
        });
    });
    $("#log").click(function () {
        $.ajax({
            url: 'http://smktesting.herokuapp.com/api/login/',
            type: 'POST',
            data: {
                username: $('#logname').val(),
                password: $('#logpw').val()
            }
        });
    });
    $("#reg").click(function(){
    $.ajax({
            url: 'http://smktesting.herokuapp.com/api/register/',
            type: 'POST',
            data: {
                username: $('#regname').val(),
                password: $('#regpw').val()
            }
        });
    });
    $(".home").click(function(){
        $("#renderHere").empty();
    });

 })
