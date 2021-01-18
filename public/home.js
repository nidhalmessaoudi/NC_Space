// Disable and enable the search submit button
$(document).ready(function(){
    $(".search-button").attr('disabled',true);
    $(".search-field").keyup(function(){
        if($(this).val().length !=0)
            $(".search-button").attr('disabled', false);            
        else
            $(".search-button").attr('disabled',true);
    })
});

