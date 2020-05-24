$.getJSON('https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/costume/costume.json', function (data) {
    let keys = Object.keys(data);
    let indices = [];

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
        preferredFormat: "hex",
        showInput: true,
        showInitial: true,
        allowEmpty: true,
        color: '',
        change: function(color) {
            if (color != null) {
                displayColorCostumes(color.toHexString());
            }
        },
    });

    // 更新
    $('input[type="checkbox"]').change(function() {
        displayCostumes();
    });
    $('input[type="date"]').change(function() {
        displayCostumes();
    });
    $('input[type="number"]').change(function() {
        displayCostumes();
    });

    // ボタン
    $('#button_ticket').on('click', function() {
        $('#type_const').prop('checked', true);
        $('#type_limit').prop('checked', false);
        $('#type_fes').prop('checked', false);
        $('#type_pst').prop('checked', false);
        $('#type_sr').prop('checked', false);
        $('#date_begin').val('2017-06-29');
        $('#date_end').val('2020-04-19');
        displayCostumes();
    });
    $('#button_psp').on('click', function() {
        $('#type_const').prop('checked', false);
        $('#type_limit').prop('checked', false);
        $('#type_fes').prop('checked', false);
        $('#type_pst').prop('checked', true);
        $('#type_sr').prop('checked', false);
        $('#date_begin').val('2017-06-29');
        $('#date_end').val('2019-10-20');
        displayCostumes();
    });
    $('#button_all').on('click', function() {
        $('#type_const').prop('checked', true);
        $('#type_limit').prop('checked', true);
        $('#type_fes').prop('checked', true);
        $('#type_pst').prop('checked', true);
        $('#type_sr').prop('checked', true);
        $('#date_begin').val('2017-06-29');
        $('#date_end').val('');
        displayCostumes();
    });

    // アイドル選択
    const colors = ['gray', '#ff2284', '#005eff', '#ffbb00'];
    const as_list = ['天海春香', '如月千早', '星井美希', '萩原雪歩', '高槻やよい', '菊地真', '水瀬伊織', '四条貴音', '秋月律子', '三浦あずさ', '双海亜美', '双海真美', '我那覇響'];
    const pr_list = ['春日未来', '田中琴葉', '佐竹美奈子', '徳川まつり', '七尾百合子', '高山紗代子', '松田亜利沙', '高坂海美', '中谷育', 'エミリー', '矢吹可奈', '横山奈緒', '福田のり子'];
    const fa_list = ['最上静香', '所恵美', 'ロコ', '天空橋朋花', '北沢志保', '舞浜歩', '二階堂千鶴', '真壁瑞希', '百瀬莉緒', '永吉昴', '周防桃子', 'ジュリア', '白石紬'];
    const an_list = ['伊吹翼', '島原エレナ', '箱崎星梨花', '野々原茜', '望月杏奈', '木下ひなた', '馬場このみ', '大神環', '豊川風花', '宮尾美也', '篠宮可憐', '北上麗花', '桜守歌織'];
    const names_list = [as_list, pr_list, fa_list, an_list];
    for (let i = 0; i < 4; i++) {
        let names = names_list[i];
        let group = $('<div class="idol_group" style="border-left: solid 10px ' + colors[i] + ';"></div>');
        for (let name of names) {
            let icon_img = 'https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/icon/2nd/' + name + '.png';
            let icon = $('<div class="idol_icon" id="' + name + '"><a><img class="icon_image" src="' + icon_img + '" title="' + name + '"></a></div>');
            group.append(icon);
        }
        $('#idol_container').append(group);
        for (let name of names) {
            $('#' + name).on('click', function() {
                displayIdolCostumes(name);
            });
        }
    }

    function displayCostume(key) {
        const costume_img = 'https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/costume/original/' + key + '.png';

        let names = $('<div class="idol_names"></div>');
        for (let name of data[key]['idol']) {
            names.append('<a id="' + name + '">' + name + '</a>');
            break;  // 多人数の場合に表示が横に広くなるのでとりえあえず一人だけに限定
        }
        if (data[key]['idol'].length > 1) {
            names.append(' <span title="' + data[key]['idol'].slice(1).join('\n') + '">他</span>');
        } else if (data[key]['id'].startsWith('sr0')) {
            names.append(' 他');
        }

        let colors = $('<div class="costume_colors"></div>');
        for (let color of data[key]['color']) {
            colors.append('<a><div class="costume_color" style="background-color: ' + color + ';" id="' + color.slice(1) + '"></div></a>');
        }

        let item = $('<div class="costume_item"></div>');
        item.append('<span class="costume_name">' + data[key]['name'] + '</span>');
        item.append(names);
        item.append('<span class="costume_type">' + data[key]['type'] + ' / ' + data[key]['datetime'].split('T')[0] + '</span>');
        item.append('<div class="costume_image" id="' + key + '"><a><img src="' + costume_img + '"></a></div>');
        item.append(colors);
        let description = data[key.split('_v')[0]]['description'].replace(/\r?\n/g, '<br>');
        item.append('<span class="costume_description">' + description + '</span>');
        let description_hover = data[key]['description'].replace(/\r?\n/g, '<br>');
        $('#costume_container').append(item);
        $('#' + key).on('click', function() {
            displaySimilarCostumes(key);
        });
        for (let name of data[key]['idol']) {
            $('#' + name).on('click', function() {
                displayIdolCostumes(name);
            });
        }
        for (let color of data[key]['color']) {
            $('#' + color.slice(1)).on('click', function() {
                displayColorCostumes(color);
            });
        }
    }
    
    function displayCostumes() {
        // 表示を初期化
        $('#costume_container').empty();

        const max_costumes = $('#max_costumes').val();
        let num_costumes = 0;
        for (let i of indices) {
            
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
            else if (type == 'FES') {
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

    function displayIdolCostumes(name) {
        indices = [];
        for (let i = 0; i < keys.length; ++i) {
            if (data[keys[i]]['idol'].includes(name)) {
                indices.push(i);
            }
        }
        displayCostumes();
        $('#picker').spectrum('set', '');
        $('html, body').animate({scrollTop:$('#costume_container').offset().top});
    }
    
    function displaySimilarCostumes(key) {
        indices = data[key][$('#sort_mode').val()]
        displayCostumes();
        $('#picker').spectrum('set', '');
        $('html, body').animate({scrollTop:$('#costume_container').offset().top});
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

        displayCostumes();
        $('#picker').spectrum('set', color);
        $('html, body').animate({scrollTop:$('#query_container').offset().top});
    }
    
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
    
});
