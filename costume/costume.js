$.getJSON('https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/costume/costume.json', function (data) {
    let keys = Object.keys(data);

    function displayCostume(key) {
        const costume_img = 'https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/costume/original/' + key + '.png';

        let names = $('<div class="idol_names"></div>');
        for (let name of data[key]['idol']) {
            names.append('<a id="' + name + '">' + name + '</a>');
            break;  // 多人数の場合に表示が横に広くなるのでとりえあえず一人だけに限定
        }
        if (data[key]['idol'].length > 1) {
            names.append(' <span title="' + data[key]['idol'].slice(1).join('\n') + '">他</span>');
        }

        let colors = $('<div class="costume_colors"></div>');
        for (let color of data[key]['mean']) {
            colors.append('<a><div class="costume_color" style="background-color: ' + color + ';"></div></a>');
        }

        let item = $('<div class="costume_item"></div>');
        item.append('<span class="costume_name">' + data[key]['name'] + '</span>');
        item.append(names);
        item.append('<div class="costume_image" id="' + key + '"><a><img src="' + costume_img + '"></a></div>');
        item.append(colors);
        let description = data[key.split('_')[0]]['description'].replace(/\r?\n/g, '<br>');
        item.append('<span class="costume_description">' + description + '</span>');
        let description_hover = data[key]['description'].replace(/\r?\n/g, '<br>');
        $('.costume_container').append(item);
        $('#' + key).on('click', function() {
            $("html, body").animate({scrollTop:$('#top').offset().top});
            $('.costume_container').empty();
            displaySimilarCostumes(key);
        });
        for (let name of data[key]['idol']) {
            $('#' + name).on('click', function() {
                $("html, body").animate({scrollTop:$('#top').offset().top});
                $('.costume_container').empty();
                displayIdolCostumes(name);
            });
        }
    }
    
    function displaySimilarCostumes(key) {
        for (let i of data[key]['sort']) {
            displayCostume(keys[i]);
        };
    }

    function displayIdolCostumes(name) {
        let keys_idol = keys.filter(function(key) {
            let cond = data[key]['idol'].includes(name);
            cond = cond && !data[key]['id'].startsWith('ex');
            // cond = cond && !key.startsWith('srufs');
            return cond;
        });
        keys_idol.sort();
        for (let key of keys_idol) {
            displayCostume(key);
        };
    }
    
    function displayColorCostumes(color) {
    }

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
        $('.idol_container').append(group);
        for (let name of names) {
            $('#' + name).on('click', function() {
                $("html, body").animate({scrollTop:$('#top').offset().top});
                $('.costume_container').empty();
                displayIdolCostumes(name);
            });
        }

    }

    
});
