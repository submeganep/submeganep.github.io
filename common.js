$(function() {

    // フッタ
    $('footer').append('<hr>');
    $('footer').append('<div><a href="https://twitter.com/submeganep">@submeganep</a> | <a href="https://submeganep.github.io/">HOME</a></div>');
    $('footer').append('<div>The copyright to THE IDOLM@STER contents belongs to BANDAI NAMCO Entertainment Inc.</div>');
    $('footer').css({
        'text-align': 'center',
        'text-size': '0.75rem',
    });

    // titleをh1に反映
    $('h1').html($('title').html());

    // 見出しのCSSを上書き（Bootstrap対応）
    $('h1').css({
        'text-align': 'center',
        'font-weight': 'bold',
        'font-size': '2rem',
        'padding-top': '0.5rem',
        'padding-bottom': '0.5rem',
        'margin-bottom': '1rem',
        'background-color': '#56c7c3',
    });
    $('h2').css({
        'font-weight': 'bold',
        'font-size': '1.5rem',
        'margin-top': '1rem',
        'margin-bottom': '0.5rem',
        'padding-left': '0.5rem',
        'border-left': 'solid 10px #56c7c3',
    });

});