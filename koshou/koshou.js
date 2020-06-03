// タッチ対応端末か否かを判定
let touch = false;
if(window.ontouchstart !== undefined && 0 < navigator.maxTouchPoints) {
    touch = true;
}

// ピン留め
let pin = {};
if (localStorage.hasOwnProperty('pin')) {
    pin = JSON.parse(localStorage.getItem('pin'));
} else {
    for (let i = 0; i < 52; i++) {
        pin[i] = {};
        for (let j = 0; j < 52; j++) {
            pin[i][j] = false;
        }
    }
}

// いいね
let like = {};
if (localStorage.hasOwnProperty('like')) {
    like = JSON.parse(localStorage.getItem('like'));
} else {
    for (let i = 0; i < 52; i++) {
        like[i] = {};
        for (let j = 0; j < 52; j++) {
            like[i][j] = false;
        }
    }
}

// ページを離れる際にローカルストレージに保存
window.onbeforeunload = function(){
    localStorage.setItem('pin', JSON.stringify(pin));
    localStorage.setItem('like', JSON.stringify(like));
}


// jsonを読込
$.getJSON('https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/koshou/koshou.json', function (data) {
    let keys = Object.keys(data);
    let names = data['names'];

    // 呼称表
    let row = $('<tr></tr>');
    row.append('<th>呼ばれる側<br>＼<br>呼ぶ側</th>');
    for (let i = 0; i < 52; i++) {
        const name = names[i];
        const datum = data[name][name];
        const age = ' (' + datum['年齢'] + ')';
        const type = '　' + datum['PrFaAn'] + ' / ' + datum['VoDaVi']
        row.append('<th id="to_' + i + '">' + name + '</th>');
        // 表示
        let item = $('<div class="koshou_item" id="item_' + i + '_' + i + '"></div>');
        item.append('<div class="head">' + name + age + type + '</div>');
        item.append('<div class="block"><div class="term">一人称</div>' + datum['一人称'] + '</div>');
        item.append('<div class="block"><div class="term">P</div>' + datum['プロデューサー'] + '</div>');
        item.append('<div class="block"><div class="term">ID</div>' + datum['ID'] + '</div>');
        item.append('<div class="block"><div class="term">出身地</div>' + datum['出身地'] + '</div>');
        item.append('<div class="block"><div class="term">誕生日</div>' + datum['誕生日'] + '</div>');
        item.append('<div class="block"><div class="term">血液型</div>' + datum['血液型'] + '</div>');
        item.append('<div class="block"><div class="term">利き手</div>' + datum['利き手'] + '</div>');
        item.append('<div class="block"><div class="term">B-W-H</div>' + datum['B'] + '-' + datum['W'] + '-' + datum['H'] + '</div>');
        item.append('<div class="block"><div class="term">身長</div>' + datum['身長'] + '</div>');
        item.append('<div class="block"><div class="term">体重</div>' + datum['体重'] + '</div>');
        item.append('<div class="block"><div class="term">趣味</div>' + datum['趣味'] + '</div>');
        item.append('<div class="block"><div class="term">特技</div>' + datum['特技'] + '</div>');
        item.append('<div class="block"><div class="term">好きなもの</div>' + datum['好きなもの'] + '</div>');
        // item.append('<div class="block"><div class="term">CV</div>' + datum['CV'] + '</div>');
        const like_icon = '<span class="material-icons" id="like_' + i + '_' + i + '">favorite_border</span>';
        const close_icon = '<span class="material-icons" id="close_' + i + '_' + i + '">highlight_off</span>';
        item.append('<div class="tail">' + like_icon + close_icon + '</div>');
        $('#koshou_container').append(item);
    }
    $('#table_item').append(row);
    for (let i = 0; i < 52; i++) {
        const name1 = names[i];
        let row = $('<tr></tr>');
        row.append('<th id="from_' + i + '">' + name1 + '</th>');
        for (let j = 0; j < 52; j++) {
            const name2 = names[j];
            const datum = data[name1][name2];
            if (name1 == name2) {
                let cell = $('<td class="cell diag" id="cell_' + i + '_' + j + '">' + '' + '</td>');
                // cell.css('background-image', 'url("https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/icon/2nd/' + name1 + '.png")');
                row.append(cell);
            } else {
                let cell = $('<td class="cell ' + datum['label'] + '" id="cell_' + i + '_' + j + '">' + '</td>');
                row.append(cell);
                // 表示
                let item = $('<div class="koshou_item" id="item_' + i + '_' + j + '"></div>');
                const age1 = ' (' + data[name1][name1]['年齢'] + ')';
                const age2 = ' (' + data[name2][name2]['年齢'] + ')';
                item.append('<div class="head">' + name1 + age1 + ' → ' + name2 + age2 + '</div>');
                item.append('<div class="block"><div class="term">呼称</div>' + datum['呼称（ミリシタ）'] + '</div>');
                item.append('<div class="block"><div class="term">予測</div>' + datum['呼称（予測）'] + '</div>');
                if (datum['呼称（その他）'] != '') {
                    item.append('<div class="block"><div class="term">他の呼称</div></div>');
                    item.append('<div class="text">' + datum['呼称（その他）'].replace(/\r?\n/g, '<br>') + '</div>');
                }
                if (datum['オファー台詞'] != '') {
                    item.append('<div class="block"><div class="term">オファー</div></div>');
                    item.append('<div class="text">' + datum['オファー台詞'].replace(/\r?\n/g, '<br>') + '</div>');
                }
                const like_icon = '<span class="material-icons" id="like_' + i + '_' + j + '">favorite_border</span>';
                const close_icon = '<span class="material-icons" id="close_' + i + '_' + j + '">highlight_off</span>';
                item.append('<div class="tail" id="tail_' + i + '_' + j + '">' + like_icon + close_icon + '</div>');
                $('#koshou_container').append(item);
            }
        }
        $('#table_item').append(row);
    }

    // セル表示更新
    function update() {
        const mode = $('input[name="mode"]:checked').val();
        for (let i = 0; i < 52; i++) {
            for (let j = 0; j < 52; j++) {
                if (i == j) {
                    continue;
                }
                let cell = $('#cell_' + i + '_' + j);
                if (mode == 'pred') {
                    const datum = data[names[i]][names[j]];
                    if (datum['label'] != '' & datum['label'] != datum['pred']) {
                        cell.text('！');
                    } else {
                        cell.text('');
                    }
                } else if (mode == 'like') {
                    if (like[i][j] == true) {
                        cell.text('♥');
                    } else {
                        cell.text('');
                    }
                } else if (mode == 'unit') {
                    // ♪
                }
            }
        }
    }
    update();
    $('input[name="mode"]').change(function() {
        update();
    });

    // 表示・非表示
    function show(i, j) {
        let cell = $('#cell_' + i + '_' + j);
        let item = $('#item_' + i + '_' + j);
        pin[i][j] = true;
        cell.animate({'border-radius': '100%'}, 500);
        item.hide();
        item.css('position', 'static');
        item.slideDown(500);
    }
    function hide(i, j) {
        let cell = $('#cell_' + i + '_' + j);
        let item = $('#item_' + i + '_' + j);
        pin[i][j] = false;
        cell.animate({'border-radius': '0%'}, 500);
        item.slideUp(500);
    }

    // ホバー
    let hover = null;
    function hover_on(i, j) {
        let cell = $('#cell_' + i + '_' + j);
        let item = $('#item_' + i + '_' + j);
        $('#from_' + i).css('background-color', 'lightgray');
        $('#to_' + j).css('background-color', 'lightgray');
        if (pin[i][j] == false) {
            const offset = cell.offset();
            cell.css('border-radius', '100%');
            // $('#tail_' + i + '_' + j).hide();
            item.show();
            item.css('position', 'absolute');
            item.css('top', offset.top + 8);
            if (touch != true) {
                item.css('left', offset.left + 8);
            }
        }
        hover = [i, j];
    }
    function hover_off(i, j) {
        let cell = $('#cell_' + i + '_' + j);
        let item = $('#item_' + i + '_' + j);
        $('#from_' + i).css('background-color', 'white');
        $('#to_' + j).css('background-color', 'white');
        if (pin[i][j] == false) {
            cell.css('border-radius', '');
            item.hide();
            item.css('position', 'static');
        }
        hover = null;
    }

    // 状態を復元
    for (let i = 0; i < 52; i++) {
        for (let j = 0; j < 52; j++) {
            if (like[i][j] == true) {
                $('#like_' + i + '_' + j).text('favorite');
            }
            if (pin[i][j] == true) {
                show(i, j);
            }
        }
    }

    // アイコンクリック
    for (let i = 0; i < 52; i++) {
        for (let j = 0; j < 52; j++) {
            $('#close_' + i + '_' + j).on('click', function() {
                hide(i, j);
            });
            $('#like_' + i + '_' + j).on('click', function() {
                const mode = $('input[name="mode"]:checked').val();
                if (like[i][j] == false) {
                    like[i][j] = true;
                    $('#like_' + i + '_' + j).text('favorite');
                    if (mode == 'like') {
                        $('#cell_' + i + '_' + j).text('♥');
                    }
                } else {
                    like[i][j] = false;
                    $('#like_' + i + '_' + j).text('favorite_border');
                    if (mode == 'like') {
                        $('#cell_' + i + '_' + j).text('');
                    }
                }
            });
        }
    }    

    // 呼称表ヘッダホバー
    for (let i = 0; i < 52; i++) {
        $('#from_' + i + ',#to_' + i).hover(function() {
            $(this).css('background-color', 'lightgray');
        }, function() {
            $(this).css('background-color', 'white');
        });
    }
    
    // 呼称表セルホバー
    if (touch == false) {
        for (let i = 0; i < 52; i++) {
            for (let j = 0; j < 52; j++) {
                let item = $('#item_' + i + '_' + j);
                $('#cell_' + i + '_' + j).hover(function() {
                    hover_on(i, j);
                }, function() {
                    hover_off(i, j);
                });
            }
        }
    }

    // 呼称表ヘッダクリック
    for (let i = 0; i < 52; i++) {
        $('#from_' + i).on('click', function() {
            if ($(this).css('font-weight') == '700') {
                for (let j = 0; j < 52; j++) {
                    hide(i, j);
                }
                $(this).css('font-weight', '400');
            } else {
                for (let j = 0; j < 52; j++) {
                    show(i, j);
                }
                $(this).css('font-weight', '700');
            }
        });
        $('#to_' + i).on('click', function() {
            if ($(this).css('font-weight') == '700') {
                for (let j = 0; j < 52; j++) {
                    hide(j, i);
                }
                $(this).css('font-weight', '400');
            } else {
                for (let j = 0; j < 52; j++) {
                    show(j, i);
                }
                $(this).css('font-weight', '700');
            }
        });
    }

    // 呼称表セルクリック
    for (let i = 0; i < 52; i++) {
        for (let j = 0; j < 52; j++) {
            let cell = $('#cell_' + i + '_' + j);
            cell.on('click', function() {
                if (touch == true) {
                    if (pin[i][j] == true) {
                        hide(i, j);
                    } else {
                        if (hover === null) {
                            hover_on(i, j);
                        } else {
                            if (hover[0] == i && hover[1] == j) {
                                hover_off(hover[0], hover[1]);
                                show(i, j);
                            } else {
                                hover_off(hover[0], hover[1]);
                                hover_on(i, j);
                            }
                        }
                    }
                } else {
                    if (pin[i][j] == true) {
                        hide(i, j);
                    } else {
                        show(i, j);
                    }
                }
            });
        }
    }
});
