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
                let c = '';
                if (datum['label'] != '' & datum['label'] != datum['pred']) {
                    c = '！'; 
                }
                let cell = $('<td class="cell ' + datum['label'] + '" id="cell_' + i + '_' + j + '">' + c + '</td>');
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
                $('#koshou_container').append(item);
            }

            
        }
        $('#table_item').append(row);
    }

    // 呼称表マウスオーバー
    for (let i = 0; i < 52; i++) {
        $('#from_' + i + ',#to_' + i).hover(function() {
            $(this).css('background-color', 'lightgray');
        }, function() {
            $(this).css('background-color', 'white');
        });
        for (let j = 0; j < 52; j++) {
            $('#cell_' + i + '_' + j).hover(function() {
                $('#from_' + i).css('background-color', 'lightgray');
                $('#to_' + j).css('background-color', 'lightgray');
            }, function() {
                $('#from_' + i).css('background-color', 'white');
                $('#to_' + j).css('background-color', 'white');
            });
        }
    }


    // 呼称表クリック
    function show(i, j) {
        $('#item_' + i + '_' + j).slideDown(500);
        $('#cell_' + i + '_' + j).animate({'border-radius': '100%'}, 500);
    }
    function hide(i, j) {
        $('#item_' + i + '_' + j).slideUp(500);
        $('#cell_' + i + '_' + j).animate({'border-radius': '0%'}, 500);
    }
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
        for (let j = 0; j < 52; j++) {
            $('#cell_' + i + '_' + j).on('click', function() {
                if ($(this).css('border-radius') == '100%') {
                    hide(i, j);
                } else {
                    show(i, j);
                }
            });
        }
    }
});
