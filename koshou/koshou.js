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

// ユニット曲などの情報
const ltp_songs = {
    '02': 'Legend Girls!!',
    '03': 'PRETTY DREAMER',
    '04': 'Blue Symphony',
    '05': 'Sentimental Venus',
    '06': 'Marionetteは眠らない',
    '07': 'カワラナイモノ',
    '08': 'Good-Sleep, Baby♡',
    '09': 'Helloコンチェルト',
    '10': '瞳の中のシリウス',
    '11': 'Fu-Wa-Du-Wa',
    '12': 'ココロがかえる場所',
    '13': 'Bigバルーン◎',
};
const ltp_themes = {
    '02': '正統派アイドル',
    '03': '元気！勇気！',
    '04': '新世代歌姫達の饗宴',
    '05': 'オシャレ・ポップ・アイドル',
    '06': 'ビューティー＆スタイリッシュ',
    '07': 'ボーカル＆エレガンス',
    '08': 'アップでキュート！',
    '09': '元気に応援！',
    '10': 'ミステリアスなウィンター・ソング ',
    '11': 'ダンサブルなスポーティー・ユニット',
    '12': '切なく愛おしいシリアス系ユニット',
    '13': 'お茶目でハチャメチャなアゲアゲユニット',
};
const lth_units = {
    '01': 'レジェンドデイズ',
    '02': '乙女ストーム！',
    '03': 'クレシェンドブルー',
    '04': 'エターナルハーモニー',
    '05': 'リコッタ',
    '06': '灼熱少女',
    '07': 'BIRTH',
    '08': 'ミックスナッツ',
    '09': 'ミルキーウェイ',
    '10': 'ARRIVE',
};
const lth_songs = {
    '01': '合言葉はスタートアップ！',
    '02': 'Growing Storm!',
    '03': 'Shooting Stars',
    '04': 'Eternal Harmony',
    '05': 'HOME, SWEET FRIENDSHIP',
    '06': 'ジレるハートに火をつけて',
    '07': 'Birth of Color',
    '08': 'ドリームトラベラー',
    '09': '星屑のシンフォニア',
    '10': 'STANDING ALIVE',
};
const ltf_units = {
    '01': 'Sunshine Rhythm',
    '02': 'BlueMoon Harmony',
    '03': 'Starlight Melody',
};
const ltf_songs = {
    '01': 'サンリズム・オーケストラ♪',
    '02': 'brave HARMONY',
    '03': 'Starry Melody',
};
const bns_songs = {
    'キャンサー': 'ランニング・ハイッ',
    'レオ': 'ゲキテキ！ムテキ！恋したい！',
    'リブラ': 'Bonnes! Bonnes!! Vacances!!!',
    'カプリコーン': 'NO CURRY NO LIFE',
    'サジタリアス': 'Raise the FLAG',
    'ピスケス': 'P.S I Love You',
    'ウィルゴ': 'プリムラ',
    'アクアリウス': '待ちぼうけのLacrima',
    'スコーピオ': 'リフレインキス',
    'アリエス': 'Sweet Sweet Soul',
    'タウラス': 'メメント？モメント♪ルルルルル☆',
    'ジェミニ': '永遠の花',
    'ソル': '',
    'ルナ': '',
    'ステラ': '',
};
const mtg_units = {
    '02': 'フェアリースターズ',
    '03': 'エンジェルスターズ',
    '04': 'プリンセススターズ',
    '05': '夜想令嬢 -GRAC&E NOCTURNE-',
    '06': 'Cleasky',
    '07': 'トゥインクルリズム',
    '08': 'EScape',
    '09': '4 Luxury',
    '10': '閃光☆HANABI団',
    '12': 'D/Zeal',
    '13': 'りるきゃん 〜3 little candy〜',
    '14': 'Charlotte・Charlotte',
    '15': 'Jelly PoP Beans',
    '16': 'ピコピコプラネッツ',
    '17': 'STAR ELEMENTS',
    '18': '765PRO ALLSTARS',
};
const mtg_songs = {
    '02': 'FairyTaleじゃいられない',
    '03': 'Angelic Parade♪',
    '04': 'Princess Be Ambitious!!',
    '05': '昏き星、遠い月 / Everlasting',
    '06': '虹色letters / 想い出はクリアスカイ',
    '07': 'ZETTAI × BREAK!! トゥインクルリズム / Tomorrow Program',
    '08': 'Melty Fantasia / I.D 〜EScape from Utopia〜',
    '09': '花ざかりWeekend✿ / RED ZONE',
    '10': '咲くは浮世の君花火 / BORN ON DREAM! 〜HANABI☆NIGHT〜',
    '12': 'ハーモニクス / 餞の鳥',
    '13': 'ハルマチ女子 / 彼氏になってよ。',
    '14': 'だってあなたはプリンセス / ミラージュ・ミラー',
    '15': '月曜日のクリームソーダ / I did+I will',
    '16': 'ピコピコIIKO! インベーダー / Get lol! Get lol! SONG',
    '17': 'Episode. Tiara / ギブミーメタファー',
    '18': 'LEADER!!',
};
const mtw_units = {
    '02': 'Chrono-Lexica',
    '03': 'Xs',
    '04': 'Sherry \'n Cherry',
    '05': 'ARCANA',
    '06': '花咲夜',
    '07': 'Jus-2-Mint',
    '08': 'miraclesonic★expassion',
    '09': '',
    '10': '',
    '11': '',
    '12': '',
    '13': '',
    '14': '',
    '15': '',
};
const mtw_songs = {
    '02': 'dans l\'obscurité / 囚われのTeaTime',
    '03': 'ラビットファー / Dreamy Dream',
    '04': 'Cherry Colored Love / 夜と、明かりと。',
    '05': 'Fermata in Rapsodia / DEpArture from THe life',
    '06': '百花は月下に散りぬるを / 矛盾の月',
    '07': 'Super Duper / Hang In There!',
    '08': '絶対的Performer / ',
    '09': '',
    '10': '',
    '11': '',
    '12': '',
    '13': '',
    '14': '',
    '15': '',
};
const ta_themes = {
    '01': '剣と魔法のファンタジー',
    '02': '任侠映画',
    '03': '学園ホラー',
};
const ta_songs = {
    '01': '創造は始まりの風を連れて',
    '02': '俠気乱舞',
    '03': '赤い世界が消える頃',
};
const tb_themes = {
    '01': '超ビーチバレー',
    '02': '三姉妹カフェ',
    '03': '劇場サスペンス',
};
const tb_songs = {
    '01': 'ビッグバンズバリボー!!!!!',
    '02': 'オーディナリィ・クローバー',
    '03': 'ラスト・アクトレス',
};
const tc_themes = {
    '01': 'おとぎの国の物語',
    '02': '近未来アウトサイダー',
    '03': '孤島サスペンスホラー',
};
const tc_songs = {
    '01': 'Girl meets Wonder',
    '02': 'World Changer',
    '03': 'クルリウタ',
};

// ユニット有無
let unit = {};
for (let i = 0; i < 52; i++) {
    unit[i] = {};
    for (let j = 0; j < 52; j++) {
        unit[i][j] = 0;
    }
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
        // 呼称
        item.append('<div class="block"><div class="term">一人称</div>' + datum['一人称'] + '</div>');
        item.append('<div class="block"><div class="term">P</div>' + datum['プロデューサー'] + '</div>');
        // プロフィール
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
        // アイコン
        const like_icon = '<div class="icon" id="like_' + i + '_' + i + '"><span class="material-icons">favorite_border</span>いいね</div>';
        const close_icon = '<div class="icon" id="close_' + i + '_' + i + '"><span class="material-icons">highlight_off</span>とじる</div>';
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
                // 呼称
                item.append('<div class="block"><div class="term">呼称</div>' + datum['呼称（ミリシタ）'] + '</div>');
                item.append('<div class="block"><div class="term">予測</div>' + datum['呼称（予測）'] + '</div>');
                if (datum['呼称（その他）'] != '') {
                    item.append('<div class="block"><div class="term">他の呼称</div></div>');
                    item.append('<div class="text">' + datum['呼称（その他）'].replace(/\r?\n/g, '<br>') + '</div>');
                }
                // オファー
                if (datum['オファー台詞'] != '') {
                    item.append('<div class="block"><div class="term">オファー</div></div>');
                    item.append('<div class="text">' + datum['オファー台詞'].replace(/\r?\n/g, '<br>') + '</div>');
                }
                // ユニット
                let units = [];
                if (datum['LTP'] != '') {
                    const ltp = datum['LTP'];
                    units.push('[LTP' + ltp + '] ' + ltp_songs[ltp]);
                    // units.push('[LTP' + ltp + '] ' + ltp_songs[ltp] + ' (' + ltp_themes[ltp] + ')');
                }
                if (datum['LTH'] != '') {
                    const lth = datum['LTH'];
                    units.push('[LTH' + lth + '] ' + lth_songs[lth] + ' (' + lth_units[lth] + ')');
                }
                if (datum['LTD'] != '') {
                    units.push('[LTD' + datum['LTD'] + '] ' + datum['LTD曲名']);
                }
                if (datum['BNSユニット'] != '') {
                    const bns = datum['BNSユニット']
                    const ltf = datum['LTF'];
                    if (ltf != '') {
                        units.push('[LTF' + ltf + '] ' + bns_songs[bns] + ' (' + bns + ')');
                    }
                }
                if (datum['MTG'] != '') {
                    const mtg = datum['MTG'];
                    units.push('[MTG' + mtg + '] ' + mtg_songs[mtg] + '<br>　　　　　(' + mtg_units[mtg] + ')');
                }
                if (datum['MTW'] != '') {
                    const mtw = datum['MTW'];
                    units.push('[MTW' + mtw + '] ' + mtw_songs[mtw] + '<br>　　　　　(' + mtw_units[mtw] + ')');
                }
                if (datum['TA'] != '') {
                    const ta = datum['TA'];
                    units.push('[TA' + ta + '] ' + ta_songs[ta] + ' (' + ta_themes[ta] + ')');
                }
                if (datum['TB'] != '') {
                    const tb = datum['TB'];
                    units.push('[TB' + tb + '] ' + tb_songs[tb] + ' (' + tb_themes[tb] + ')');
                }
                if (datum['TC'] != '') {
                    const tc = datum['TC'];
                    units.push('[TC' + tc + '] ' + tc_songs[tc] + ' (' + tc_themes[tc] + ')');
                }
                if (units.length > 0) {
                    unit[i][j] = units.length;
                    item.append('<div class="block"><div class="term">ユニット</div></div>');
                    item.append('<div class="text">' + units.join('<br>') + '</div>');
                }
                // アイコン
                const like_icon = '<div class="icon" id="like_' + i + '_' + j + '"><span class="material-icons">favorite_border</span>いいね</div>';
                const close_icon = '<div class="icon" id="close_' + i + '_' + j + '"><span class="material-icons">highlight_off</span>とじる</div>';
                item.append('<div class="tail">' + like_icon + close_icon + '</div>');
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
                        cell.text('❗');
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
                    if (unit[i][j] > 0) {
                        cell.text(unit[i][j]);
                        // cell.text('🎵');
                        // cell.text('🎤');
                    } else {
                        cell.text('');
                    }
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
            item.show();
            item.css('position', 'absolute');
            item.css('top', offset.top + 8);
            if (touch != true) {
                item.css('left', offset.left + 17);
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
                $('#like_' + i + '_' + j + ' span').text('favorite');
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
                hover_off(i, j);
            });
            $('#like_' + i + '_' + j).on('click', function() {
                const mode = $('input[name="mode"]:checked').val();
                if (like[i][j] == false) {
                    like[i][j] = true;
                    $('#like_' + i + '_' + j + ' span').text('favorite');
                    if (mode == 'like') {
                        $('#cell_' + i + '_' + j).text('♥');
                    }
                } else {
                    like[i][j] = false;
                    $('#like_' + i + '_' + j + ' span').text('favorite_border');
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
