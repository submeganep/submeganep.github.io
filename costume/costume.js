// カラーコードをLab*に変換する関数
function convertToLab(color) {
    // https://qiita.com/hachisukansw/items/09caabe6bec46a2a0858
    let r = parseInt(color.substring(1, 3), 16) / 255;
    let g = parseInt(color.substring(3, 5), 16) / 255;
    let b = parseInt(color.substring(5, 7), 16) / 255;
    r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
    g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
    b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
    let x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
    let y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
    let z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
    x *= 100 / 95.047;
    y *= 100 / 100;
    z *= 100 / 108.883;
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (4 / 29);
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (4 / 29);
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (4 / 29);
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
}

// いいね
let like = [];
if (localStorage.hasOwnProperty('like_20200712')) {
    like = JSON.parse(localStorage.getItem('like_20200712'));
}

// 所持
let star = [];
if (localStorage.hasOwnProperty('star_20200712')) {
    star = JSON.parse(localStorage.getItem('star_20200712'));
}

// ページを離れる際にローカルストレージに保存
window.onbeforeunload = function(){
    localStorage.setItem('like_20200712', JSON.stringify(like));
    localStorage.setItem('star_20200712', JSON.stringify(star));
}

$.getJSON('https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/costume/costume.json', function (data) {
    let keys = Object.keys(data).reverse();
    let indices = [];
    for (let i = 0; i < keys.length; ++i) {
        indices.push(i);
    }

    // 代表色のカラーコードをL*a*b*に変換
    for (let key of keys) {
        let lab = [];
        for (let color of data[key]['color']) {
            lab.push(convertToLab(color));
        }
        data[key]['lab'] = lab;
    }

    // カラーピッカー
    $("#picker").spectrum({
        preferredFormat: 'hex',
        showInput: true,
        showInitial: true,
        allowEmpty: true,
        color: '',
        chooseText: 'OK',
        cancelText: 'キャンセル',
        change: function(color) {
            if (color != null) {
                displayColorCostumes(color.toHexString());
            }
        },
        containerClassName: 'picker_container',
        replacerClassName: 'picker_replacer',
    });
    
    // アイドル絞込
    // const colors = ['gray', '#ff2284', '#005eff', '#ffbb00'];
    // const types = ['AS', 'Pr', 'Fa', 'An'];
    // const as_list = ['天海春香', '如月千早', '星井美希', '萩原雪歩', '高槻やよい', '菊地真', '水瀬伊織', '四条貴音', '秋月律子', '三浦あずさ', '双海亜美', '双海真美', '我那覇響'];
    // const pr_list = ['春日未来', '田中琴葉', '佐竹美奈子', '徳川まつり', '七尾百合子', '高山紗代子', '松田亜利沙', '高坂海美', '中谷育', 'エミリー', '矢吹可奈', '横山奈緒', '福田のり子'];
    // const fa_list = ['最上静香', '所恵美', 'ロコ', '天空橋朋花', '北沢志保', '舞浜歩', '二階堂千鶴', '真壁瑞希', '百瀬莉緒', '永吉昴', '周防桃子', 'ジュリア', '白石紬'];
    // const an_list = ['伊吹翼', '島原エレナ', '箱崎星梨花', '野々原茜', '望月杏奈', '木下ひなた', '馬場このみ', '大神環', '豊川風花', '宮尾美也', '篠宮可憐', '北上麗花', '桜守歌織'];
    // const names_list = [as_list, pr_list, fa_list, an_list];
    // for (let i = 0; i < 4; i++) {
    //     let names = names_list[i];
    //     let group = $('<div class="idol_group" style="border-left: solid 10px ' + colors[i] + ';"></div>');
    //     for (let name of names) {
    //         let idol = $('<label for="'+ name + '"><input type="checkbox" class="idol_type' + i + '" id="' + name + '" checked>'+ name + '</label>');
    //         group.append(idol);
    //     }
    //     $('#idol_groups').append(group);
    // }
    const idol_names = [
        '天海春香', '如月千早', '星井美希', '萩原雪歩', '高槻やよい', '菊地真', '水瀬伊織', '四条貴音', '秋月律子', '三浦あずさ', '双海亜美', '双海真美', '我那覇響',
        '春日未来', '最上静香', '伊吹翼', '田中琴葉', '島原エレナ', '佐竹美奈子', '所恵美', '徳川まつり', '箱崎星梨花', '野々原茜', '望月杏奈', 'ロコ', '七尾百合子',
        '高山紗代子', '松田亜利沙', '高坂海美', '中谷育', '天空橋朋花', 'エミリー', '北沢志保', '舞浜歩', '木下ひなた', '矢吹可奈', '横山奈緒', '二階堂千鶴', '馬場このみ',
        '大神環', '豊川風花', '宮尾美也', '福田のり子', '真壁瑞希', '篠宮可憐', '百瀬莉緒', '永吉昴', '北上麗花', '周防桃子', 'ジュリア', '白石紬', '桜守歌織',
    ]
    for (let name of idol_names) {
        $('#select_idols').append('<option selected value="' + name + '">' + name + '</option>');
    }
    $('#select_idols').SumoSelect({
        placeholder: '未選択',
        csvDispCount: 6,
        captionFormat:'{0}人を選択中', 
        captionFormatAllSelected:'全員',
        selectAll: true,
        search: true,
        searchText: 'アイドル名を検索',
        noMatch: '"{0}" は見つかりません',
        locale: ['OK', 'キャンセル', '全選択／解除'],
        okCancelInMulti: true,
        triggerChangeCombined: true,
        forceCustomRendering: true,
    });
    $('#select_idols').on('change', function(){
        displayCostumes();
    })

    // 更新
    $('#setting_container input').change(function() {
        displayCostumes();
    });
    $('#filter_container input').change(function() {
        displayCostumes();
    });

    // 検索ボタン
    $('#button_all').on('click', function() {
        displayAllCostumes();
    });
    $('#button_like').on('click', function() {
        displayLikeCostumes();
    });

    // 絞込ボタン
    $('#button_ticket').on('click', function() {
        $('#star').prop('checked', false);
        $('#unstar').prop('checked', true);
        $('#normal').prop('checked', true);
        $('#another').prop('checked', false);
        $('#another2').prop('checked', false);
        $('#type_const').prop('checked', true);
        $('#type_limit').prop('checked', false);
        $('#type_fes').prop('checked', false);
        $('#type_pst').prop('checked', false);
        $('#type_sr').prop('checked', false);
        $('#date_begin').val('2017-06-29');
        $('#date_end').val('2020-04-19');
        displayCostumes();
    });
    $('#button_ticket2').on('click', function() {
        $('#star').prop('checked', false);
        $('#unstar').prop('checked', true);
        $('#normal').prop('checked', true);
        $('#another').prop('checked', false);
        $('#another2').prop('checked', false);
        $('#type_const').prop('checked', true);
        $('#type_limit').prop('checked', true);
        $('#type_fes').prop('checked', false);
        $('#type_pst').prop('checked', false);
        $('#type_sr').prop('checked', false);
        $('#date_begin').val('2017-06-29');
        $('#date_end').val('2019-06-19');
        displayCostumes();
    });
    $('#button_psp').on('click', function() {
        $('#star').prop('checked', false);
        $('#unstar').prop('checked', true);
        $('#normal').prop('checked', true);
        $('#another').prop('checked', true);
        $('#another2').prop('checked', true);
        $('#type_const').prop('checked', false);
        $('#type_limit').prop('checked', false);
        $('#type_fes').prop('checked', false);
        $('#type_pst').prop('checked', true);
        $('#type_sr').prop('checked', false);
        $('#date_begin').val('2017-06-29');
        $('#date_end').val('2019-12-17');
        displayCostumes();
    });
    $('#button_reset').on('click', function() {
        $('#star').prop('checked', true);
        $('#unstar').prop('checked', true);
        $('#normal').prop('checked', true);
        $('#another').prop('checked', true);
        $('#another2').prop('checked', true);
        $('#type_const').prop('checked', true);
        $('#type_limit').prop('checked', true);
        $('#type_fes').prop('checked', true);
        $('#type_pst').prop('checked', true);
        $('#type_sr').prop('checked', true);
        $('#date_begin').val('2017-06-29');
        $('#date_end').val('');
        displayCostumes();
    });

    function displayCostume(key) {
        const costume_img = 'https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/costume/original/' + key + '.png';

        let names = $('<div class="idol_names"></div>');
        for (let name of data[key]['idol']) {
            names.append('<a class="idol_name" id="' + name + '">' + name + '</a>');
            break;  // 多人数の場合に表示が横に広くなるのでとりえあえず一人だけに限定
        }
        if (data[key]['idol'].length > 1) {
            names.append(' <span title="' + data[key]['idol'].slice(1).join('\n') + '">他</span>');
        } else if (data[key]['type'] == 'PST' & data[key]['id'].startsWith('sr0')) {
            names.append(' 他');
        }

        let colors = $('<div class="costume_colors"></div>');
        for (let color of data[key]['color']) {
            colors.append('<a><div class="costume_color" style="background-color: ' + color + ';" id="' + color.slice(1) + '"></div></a>');
        }

        let icons = $('<div class="costume_icons"></div>');
        let costume_name = data[key]['name'];
        if (costume_name.slice(-2) == '++') {
            costume_name = costume_name.slice(0, -2) + '%2b%2b（アナザー2）';
        } else if (costume_name.slice(-1) == '+') {
            costume_name = costume_name.slice(0, -1) + '%2b（アナザー）';
        } else {
            costume_name = costume_name + '（ノーマル）';
        }
        let url_tweet = 'https://twitter.com/intent/tweet?text=' + costume_name + '%0a%23ミリシタ衣装検索';
        url_tweet += '%20%23' + data[key]['id'];
        url_tweet += '%20%23' + data[key]['idol'][0];
        let url_search = 'https://twitter.com/search?q=%23ミリシタ衣装検索';
        url_search += '%20%23' + data[key]['id'];
        if (data[key]['id'].startsWith('ss')) {
            url_search += '%20%23' + data[key]['idol'][0];
        }
        url_search += '&src=typed_query';

        let item = $('<div class="costume_item"></div>');
        item.append('<span class="costume_name">' + data[key]['name'] + '</span>');
        item.append(names);
        item.append('<span class="costume_type">' + data[key]['type'] + ' / ' + data[key]['datetime'].split('T')[0] + '</span>');
        item.append('<div class="costume_image"><a id="' + key + '"><img src="' + costume_img + '"></a></div>');
        item.append(colors);
        let description = data[key.split('_v')[0]]['description'].replace(/\r?\n/g, '<br>');
        item.append('<span class="costume_description">' + description + '</span>');
        icons.append('<div class="costume_icon"><a href="' + url_search + '" target="_blank"><i class="fas fa-search"></i>検索</a></div>');
        icons.append('<div class="costume_icon"><a href="' + url_tweet + '" target="_blank"><i class="far fa-comment"></i>投稿</a></div>');
        const star_icon = (star.includes(key)) ? 'fas' : 'far';
        const like_icon = (like.includes(key)) ? 'fas' : 'far';
        icons.append('<div class="costume_icon" id="star_' + key + '"><i class="' + star_icon + ' fa-star"></i>所持</div>');
        icons.append('<div class="costume_icon" id="like_' + key + '"><i class="' + like_icon + ' fa-heart"></i>いいね</div>');
        item.append(icons);

        $('#costume_container').append(item);

        // クリック時の挙動
        $('#' + key).on('click', function() {
            $('#select_idols')[0].sumo.selectAll();
            displaySimilarCostumes(key);
            $('html, body').animate({scrollTop:$('#search_container').offset().top});
        });
        for (let color of data[key]['color']) {
            $('#' + color.slice(1)).on('click', function() {
                $('#select_idols')[0].sumo.selectAll();
                displayColorCostumes(color);
                $('html, body').animate({scrollTop:$('#search_container').offset().top});
            });
        }
        for (let name of data[key]['idol']) {
            $('#' + name).on('click', function() {
                displayIdolCostumes(name);
                $('html, body').animate({scrollTop:$('#search_container').offset().top});
            });
        }
        $('#like_' + key).on('click', function() {
            const index = like.indexOf(key);
            if (index == -1) {
                like.push(key);
            } else {
                like.splice(index, 1);
            }
            $('#like_' + key + ' i').toggleClass('far');
            $('#like_' + key + ' i').toggleClass('fas');
        });
        $('#star_' + key).on('click', function() {
            const index = star.indexOf(key);
            if (index == -1) {
                star.push(key);
            } else {
                star.splice(index, 1);
            }
            $('#star_' + key + ' i').toggleClass('far');
            $('#star_' + key + ' i').toggleClass('fas');
        });
    }
    
    function displayCostumes() {
        // 表示を初期化
        $('#costume_container').empty();

        // アイドル
        const idols = $('#select_idols').val();

        const max_costumes = $('#max_costumes').val();
        let num_costumes = 0;
        for (let i of indices) {

            // アイドルで絞込
            const idol = data[keys[i]]['idol'][0];
            if (idols.indexOf(idol) == -1) {
                continue;
            }
            
            // 所持状況で絞込
            if (!$('#star').prop('checked')) {
                if (star.includes(keys[i])) {
                    continue;
                }
            }
            if (!$('#unstar').prop('checked')) {
                if (!star.includes(keys[i])) {
                    continue;
                }
            }

            // ノーマル・アナザー・アナザー2で絞込
            const totsu = data[keys[i]]['id'][2];
            if (totsu == '0') {
                if (!$('#normal').prop('checked')) {
                    continue;
                }
            }
            else if (totsu == '1') {
                if (!$('#another').prop('checked')) {
                    continue;
                }
            }
            else if (totsu == '2') {
                if (!$('#another2').prop('checked')) {
                    continue;
                }
            }

            // 制服・ミリクロをスキップ
            if (keys[i].slice(0, 5) == 'srufs') {
                continue;
            }
            if (keys[i].slice(0, 5) == 'srclo') {
                continue;
            }

            // 種類で絞込
            const type = data[keys[i]]['type'];
            if (type == '恒常SSR') {
                if (!$('#type_const').prop('checked')) {
                    continue;
                }
            }
            else if (type == '限定SSR') {
                if (!$('#type_limit').prop('checked')) {
                    continue;
                }
            }
            else if (type == 'FES限定') {
                if (!$('#type_fes').prop('checked')) {
                    continue;
                }
            }
            else if (type == 'PST') {
                if (!$('#type_pst').prop('checked')) {
                    continue;
                }
            }
            else if (type == 'SR') {
                if (!$('#type_sr').prop('checked')) {
                    continue;
                }
            }
            else {  // 周年衣装などはスキップ
                continue;
            }

            // 期間で絞込
            const date = Date.parse(data[keys[i]]['datetime'].split('T')[0]);
            const date_begin = Date.parse($('#date_begin').val());
            const date_end = Date.parse($('#date_end').val());
            if (!isNaN(date_begin)) {
                if (date < date_begin) {
                    continue;
                }
            }
            if (!isNaN(date_end)) {
                if (date > date_end) {
                    continue;
                }
            }

            // 表示
            displayCostume(keys[i]);

            // 最大表示数
            num_costumes++;
            if (num_costumes >= max_costumes) {
                break;
            }
        }
    }
    
    function displayAllCostumes() {
        indices = [];
        for (let i = 0; i < keys.length; ++i) {
            indices.push(i);
        }
        $('.search_mode').removeClass('selected');
        $('#button_all').addClass('selected');
        $('#button_costume').hide();
        $('#picker').spectrum('set', '');
        displayCostumes();
    }

    function displayLikeCostumes() {
        indices = [];
        for (let i = 0; i < keys.length; ++i) {
            if (like.includes(keys[i])) {
                indices.push(i);
            }
        }
        $('.search_mode').removeClass('selected');
        $('#button_like').addClass('selected');
        $('#button_costume').hide();
        $('#picker').spectrum('set', '');
        displayCostumes();
    }

    function displayIdolCostumes(idol) {
        $('#select_idols')[0].sumo.unSelectAll();
        $('#select_idols')[0].sumo.selectItem(idol);
        $('#button_costume').hide();
        $('#picker').spectrum('set', '');
        displayAllCostumes();
    }
    
    function displaySimilarCostumes(key) {
        indices = data[key][$('#sort_mode').val()]
        $('.search_mode').removeClass('selected');
        $('#button_costume').text(data[key]['name']);
        $('#button_costume').addClass('selected');
        $('#button_costume').show();
        $('#picker').spectrum('set', '');
        displayCostumes();

    }
    
    function displayColorCostumes(color) {

        let lab = convertToLab(color);
        let min_dists = [];
        for (let key of keys) {
            let dists = [];
            for (let lab_ of data[key]['lab']) {
                let dist = (lab[0] - lab_[0])**2 + (lab[1] - lab_[1])**2 + (lab[2] - lab_[2])**2;
                dists.push(dist);
            }
            min_dists.push(Math.min.apply(null, dists));
        }
        // argsort
        let len = min_dists.length;
        indices = new Array(len);
        for (let i = 0; i < len; ++i) indices[i] = i;
        indices.sort(function (a, b) { return min_dists[a] < min_dists[b] ? -1 : min_dists[a] > min_dists[b] ? 1 : 0; });

        $('.search_mode').removeClass('selected');
        $('#button_costume').hide();
        $('#picker').spectrum('set', color);
        displayCostumes();
    }
    
    // 初期表示
    displayAllCostumes();
});
