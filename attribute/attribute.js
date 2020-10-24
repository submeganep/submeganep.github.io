let tune_names = Object.keys(tunes);
let idol_names = Object.keys(params['idol']);
let questions = params['question'];

// 属性のカラーコード
const type_colors = {
    'Pr': '#ff2284',
    'Fa': '#005eff',
    'An': '#ffbb00',
};

// 属性のカラーコードを算出する関数
function getTypeColor(type, alpha=1) {
    if (type.slice(0, 2) === 'Pr') {
        return `rgba(255,34,132,${alpha})`;
    }
    else if (type.slice(0, 2) === 'Fa') {
        return `rgba(0,94,255,${alpha})`;
    }
    else if (type.slice(0, 2) === 'An') {
        return `rgba(255,187,0,${alpha})`;
    }
}

// 配置座標算出用の定数
const sin60 = Math.sin(Math.PI / 3.0);
const cos60 = Math.cos(Math.PI / 3.0);
const radius = 500;

// 配置座標を算出する関数
function getPosition(pr, fa, an) {
    let x = (an - fa) * sin60;
    let y = (fa + an) * cos60 - pr;
    x = Math.ceil(x * radius);
    y = Math.ceil(y * radius);
    return {x, y};
}

// アイドル詳細表示
function displayIdol(name, nodes, edges, target_id) {

    // 対象
    target = '#' + target_id + '.idol_container';

    // アイコンをリセット
    for (let i = 0; i < idol_names.length; i++) {
        nodes.update({
            id: idol_names[i],
            hidden: false,
        });
    }
    nodes.remove('selected');

    // アイドル名が空なら表示を隠して終了
    if (name === '') {
        $(target).hide();
        $('#tunes_container').hide();
        return;
    }

    // 不要な表示を非表示
    nodes.update({
        id: 'anata',
        hidden: true,
    });
    nodes.update({
        id: 'description',
        hidden: true,
    });

    // アイコンを拡大
    nodes.update({
        id: name,
        hidden: true,
    });
    nodes.add({
        id: 'selected',
        shape: 'image',
        image: './icon/' + name + '.png',
        size: 75,
        mass: 10,
        shadow: true,
        fixed: true,
        x: params['idol'][name]['x'],
        y: params['idol'][name]['y'],
    });

    // アイドルのプロフィールを表示
    let idol = params['idol'][name];
    let sei_mei = idol['姓'] + ' ' + idol['名'];
    if (name === 'エミリー' | name === 'ロコ') {
        sei_mei = name;
    }
    $(target + ' .idol_eng').text(idol['Given'] + ' ' + idol['Family']);
    $(target + ' .idol_name').css({'color': idol['カラーコード']}).text(sei_mei);
    $(target + ' .idol_introduction').html(idol['ミリシタ紹介文'].replace(/\r?\n/g, '<br>'));

    // 属性色の線を引く
    $(target + ' .idol_header').css('border-left', 'solid 20px ' + getTypeColor(idol['PrFaAn'], 0.2));
    $(target + ' .idol_header').css('border-right', 'solid 20px ' + getTypeColor(idol['PrFaAn'], 0.2));
    // $(target + ' .idol_header').css(
    //     'background',
    //     `linear-gradient(90deg, ${getTypeColor(idol['PrFaAn'])} 0%, ${getTypeColor(idol['PrFaAn'], 0.1)} 10%, ${getTypeColor(idol['PrFaAn'], 0.1)} 90%, ${getTypeColor(idol['PrFaAn'])} 100%)`
    // );

    // 表
    $(target + ' .属性').text(idol['PrFaAn']);
    // $(target + ' .属性').text(idol['PrFaAn'] + ' / ' + idol['VoDaVi']);
    $(target + ' .年齢').text(idol['年齢'] + '歳');
    $(target + ' .誕生日').text(idol['誕生日']);
    $(target + ' .星座').text(idol['星座']);
    $(target + ' .身長体重').text(idol['身長'] + 'cm / ' + idol['体重'] + 'kg');
    $(target + ' .スリーサイズ').text(idol['B'] + '-' + idol['W'] + '-' + idol['H']);
    $(target + ' .血液型').text(idol['血液型'] + '型');
    $(target + ' .利き手').text(idol['利き手']);
    $(target + ' .出身地').text(idol['出身地']);
    $(target + ' .趣味').text(idol['趣味']);
    $(target + ' .特技').text(idol['特技']);
    $(target + ' .好きなもの').text(idol['好きなもの']);
    $(target + ' .CV').text(idol['CV']);

    // 背景
    // idol['ID']  // 03みたいなIDを背景右上に表示するといいかも
    $(target).css('background-image', 'url(./standing/' + name + '.png)');

    // 選択されたアイドル
    $('.selected_idol').text(name);
    let name_niconico = name;
    let name_pixiv = name;
    let name_wiki = name;
    let id_fantasia = idol['ID'];
    if (name == 'ロコ') {
        name_niconico = 'ロコ%28アイドルマスター%29';
        name_pixiv = '伴田路子';
        name_wiki = '伴田路子%28ロコ%29';
    }
    else if (name == 'ジュリア') {
        name_niconico += '%28アイドルマスター%29';
        name_pixiv += '%28アイマス%29';
    }
    else if (name == 'エミリー') {
        name_niconico = 'エミリー%20スチュアート';
        name_pixiv = 'エミリー・スチュアート';
        name_wiki = 'エミリー%20スチュアート';
    }
    if (idol['ID'] == 17) {
        id_fantasia = 218;
    }
    else if (idol['ID'] > 17) {
        id_fantasia--;
    }
    const story = {
        '天海春香': 18,
        '萩原雪歩': 26,
        '菊地真': 27,
        '我那覇響': 28,
        '春日未来': 37,
        '田中琴葉': 38,
        '佐竹美奈子': 39,
        '徳川まつり': 40,
        '七尾百合子': 41,
        '高山紗代子': 42,
        '松田亜利沙': 43,
        '高坂海美': 44,
        '中谷育': 45,
        'エミリー': 46,
        '矢吹可奈': 47,
        '横山奈緒': 48,
        '福田のり子': 49,
        '如月千早': 22,
        '水瀬伊織': 29,
        '四条貴音': 30,
        '秋月律子': 31,
        '最上静香': 50,
        '所恵美': 51,
        'ロコ': 52,
        '天空橋朋花': 53,
        '北沢志保': 54,
        '舞浜歩': 55,
        '二階堂千鶴': 56,
        '真壁瑞希': 57,
        '百瀬莉緒': 58,
        '永吉昴': 59,
        '周防桃子': 60,
        'ジュリア': 61,
        '白石紬': 62,
        '星井美希': 23,
        '高槻やよい': 32,
        '三浦あずさ': 33,
        '双海亜美': 34,
        '双海真美': 35,
        '伊吹翼': 63,
        '島原エレナ': 64,
        '箱崎星梨花': 65,
        '野々原茜': 66,
        '望月杏奈': 67,
        '木下ひなた': 68,
        '馬場このみ': 69,
        '大神環': 70,
        '豊川風花': 71,
        '宮尾美也': 72,
        '篠宮可憐': 73,
        '北上麗花': 74,
        '桜守歌織': 75,
    };

    // リンク
    $('#links_items').empty();
    let links = '';
    links += '<a href="https://dic.nicovideo.jp/a/' + name_niconico + '" target="_blank">';
    links += '<button type="button" class="btn btn-outline-dark m-1">ニコニコ大百科</button></a>'
    links += '<a href="https://dic.pixiv.net/a/' + name_pixiv + '" target="_blank">';
    links += '<button type="button" class="btn btn-outline-dark m-1">ピクシブ百科事典</button></a>';
    // links += '<a href="https://mltd.matsurihi.me/cards/' + id_fantasia + '" target="_blank">';
    // links += '<button type="button" class="btn btn-outline-dark m-1">Fantasia</button></a>';
    // links += '<a href="http://greemas.doorblog.jp/tag/' + name + '" target="_blank">';
    // links += '<button type="button" class="btn btn-outline-dark m-1">グリマス日和</button></a>';
    links += '<a href="https://imasml-theater-wiki.gamerch.com/' + name + '" target="_blank">';
    links += '<button type="button" class="btn btn-outline-dark m-1">ミリシタ攻略まとめwiki</button></a>';
    if (name != '白石紬' && name != '桜守歌織') {
        links += '<a href="https://millionlive.info/?' + name_wiki + '" target="_blank">';
        links += '<button type="button" class="btn btn-outline-dark m-1">ミリオンライブWiki</button></a>';
    }
    links += '<a href="https://w.atwiki.jp/ml-story/pages/' + story[name] + '.html" target="_blank">';
    links += '<button type="button" class="btn btn-outline-dark m-1">ミリシタストーリーまとめ</button></a>';
    links += '<a href="https://imas.gamedbs.jp/mlth/chara/show/' + idol['ID'] + '" target="_blank">';
    links += '<button type="button" class="btn btn-outline-dark m-1">ミリシタDB</button></a>';
    $('#links_items').append(links);

    // 楽曲
    $('#tunes_items').empty();
    for (let i = 0; i < tune_names.length; i++) {
        let tune_name = tune_names[i];
        let tune = tunes[tune_name];
        if (tune['idol_names'].includes(name)) {
            if (tune['idol_names'].length > 5) {
                continue;
            }
            let tune_body = $('<div class="col-lg-4 col-md-6 col-12 p-0 mb-2 mb-2 bg-light border border-white" />');
            tune_body.append(`<div class="embed-responsive embed-responsive-16by9 bg-secondary text-white d-flex align-items-center justify-content-center" style="cursor: pointer;" id="player_${i}">YouTubeで試聴</div>`);
            tune_body.append('<div class="text-center font-weight-bold">' + tune_name + '</div>');
            let tune_idols = $('<div class="text-center"></div>');
            for (let idol_name of tune['idol_names']) {
                tune_idols.append('<img src="./icon/' + idol_name + '.png" style="width: 60px;">');
            }
            tune_body.append(tune_idols);
            tune_body.append('<div class="text-center">' + tune['unit_name'] + '</div>');
            $('#tunes_items').append(tune_body);
            $('#player_' + i).on('click', function() {
                $('#player_' + i).append('<iframe class="embed-responsive-item" src="' + tune['url'] + '" type="text/html"></iframe>');
            });
        }
    }

    // 表示
    $(target).slideDown(400);
    $('#links_container').slideDown(400);
    $('#tunes_container').slideDown(400);
    if (target_id == 'result') {
        $('#selected.idol_container').hide();
    }
}

// 予測
function predict() {
    let pr = params['coef']['Pr'][questions.length * 2];
    let fa = params['coef']['Fa'][questions.length * 2];
    let an = params['coef']['An'][questions.length * 2];
    for (let i = 0; i < questions.length; i++) {
        let answer = $('#radio_' + i + ' label.active input').val();
        if (answer === 'yes') {
            pr += params['coef']['Pr'][i];
            fa += params['coef']['Fa'][i];
            an += params['coef']['An'][i];
        }
        else if (answer === 'no') {
            pr += params['coef']['Pr'][i + questions.length];
            fa += params['coef']['Fa'][i + questions.length];
            an += params['coef']['An'][i + questions.length];
        }
        else if (answer === 'na') {
        }
    }
    pr = 1 / (1 + Math.exp(-pr));
    fa = 1 / (1 + Math.exp(-fa));
    an = 1 / (1 + Math.exp(-an));
    let sum = pr + fa + an;
    pr /= sum;
    fa /= sum;
    an /= sum;
    return {pr, fa, an};
}

// パーセント表示を更新
function updatePercetage(pr, fa, an) {
    let pr_percent = pr * 100;
    let fa_percent = fa * 100;
    let an_percent = an * 100;
    $('#result_pr').text(Math.round(pr_percent));
    $('#result_fa').text(Math.round(fa_percent));
    $('#result_an').text(Math.round(an_percent));
    $('#bar_pr').animate({'width': pr_percent + '%'});
    $('#bar_fa').animate({'width': fa_percent + '%'});
    $('#bar_an').animate({'width': an_percent + '%'});
}

// 設問への回答が似たアイドルを取得
function getSimilarIdol(pr, fa, an) {

    let max_score = Math.max(pr, fa, an);
    let min_score = Math.min(pr, fa, an);

    let idol_similar = '';
    let best_similarity = -100;
    for (let i = 0; i < idol_names.length; i++) {
        let name = idol_names[i];

        // max_scoreの属性と異なるアイドルはスキップ
        if (min_score === max_score) {
            continue;
        }
        else if (pr === max_score) {
            if (params['idol'][name]['PrFaAn'] !== 'Princess') {
                continue;
            }
        }
        else if (fa === max_score) {
            if (params['idol'][name]['PrFaAn'] !== 'Fairy') {
                continue;
            }
        }
        else {
            if (params['idol'][name]['PrFaAn'] !== 'Angel') {
                continue;
            }
        }

        // cosine類似度を算出
        let answers = params['idol'][name]['answer'];
        let similarity = 0;
        let total_you = 0;
        let total_idol = 0;
        for (let j = 0; j < answers.length; j++) {
            let answer = $('#radio_' + j + ' label.active input').val();
            if (answer === 'yes') {
                similarity += answers[j];
                total_you++;
            }
            else if (answer === 'no') {
                similarity -= answers[j];
                total_you++;
            }
            if (answers[j] !== 0) {
                total_idol++;
            }
        }
        similarity = similarity / Math.sqrt(total_you * total_idol);

        // 類似度が最大となるアイドルを記憶
        if (similarity > best_similarity) {
            best_similarity = similarity;
            idol_similar = name;
        }
    }

    return idol_similar;
}

// 結果を更新
function updateResult(pr, fa, an) {

    // 結果を更新
    let max_score = Math.max(pr, fa, an);
    let min_score = Math.min(pr, fa, an);
    let result_summary;
    let result_detail;
    let result_attribute = '';
    if (min_score === max_score) {
        result_summary = 'あたなはどの属性とも言えないです';
        result_detail = '「どちらでもない」ばかり選んでいませんか？';
    }
    else if (pr === max_score) {
        result_summary = 'あたなはどこからどうみても <span class="attribute pr">Princess</span> です！';
        result_detail = '気持ちがまっすぐで周囲を巻き込んでいくパワーを持つあなたは、どうみてもプリンセスです。友達想いのあなたの周りにはいつも楽しい空気が流れているはず。もしかしたら自分では気付いていないかもしれませんが、あなたの一生懸命さにみんな勇気づけられていますよ！';
        result_attribute = 'Princess';
        $('#result_container').css('background', 'rgba(255,34,132,0.2)')
    }
    else if (fa === max_score) {
        result_summary = 'あなたは周囲の人から <span class="attribute fa">Fairy</span> だと思われています！';
        result_detail = '全身からかっこよさが溢れ、物事を深く考えがちなあなたは、普段からフェアリーだなと思われています。自他共に妥協を許さない姿勢はなにかと周りのレベルを引き上げているはず。落ち込むことも多いかもしれませんが、あなたの魅力に気付いている人はあなたが思うよりずっとたくさんいますよ！';
        result_attribute = 'Fairy';
        $('#result_container').css('background', 'rgba(0,94,255,0.2)')
    }
    else {
        result_summary = 'あなたは <span class="attribute an">Angel</span> っぽいところがあるみたいですね～！';
        result_detail = '癒やしの空気を纏い自然体で生きるあなたは、エンジェルっぽいです！人と違うテンポで生きているあなたは、周りの人が越えられないハードルも簡単に飛び越えてみせているはず。きっと気にしていないとは思いますが、あなたの楽しく過ごす姿に心が安らいでいる人もいっぱいいますよ！';
        result_attribute = 'Angel';
        $('#result_container').css('background', 'rgba(255,187,0,0.2)')
    }
    $('#result_summary').html(result_summary);
    $('#result_detail').html(result_detail);
    $('#result_container').slideDown(400);

    // 似たアイドルを表示
    let idol_similar = getSimilarIdol(pr, fa, an);

    // ツイート
    if (result_attribute != '') {
        let tweet = '';
        tweet += '<a class="twitter-share-button" href="https://twitter.com/intent/tweet?';
        tweet += 'text=あなたの属性は' + result_attribute + 'です．';
        tweet += 'あなたは' + idol_similar + 'に似ています．';
        // tweet += ' https://twitter.com/.../status/.../photo/1';
        tweet += '&hashtags=ミリシタ属性診断,ミリシタ,ミリオンライブ';
        tweet += '&url=https://submeganep.github.io/attribute/';
        tweet += '" data-size="large" data-lang="ja">Tweet</a>';
        tweet += '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
        $('#tweet_button').html(tweet);
        $('#tweet_container').slideDown(400);
    }
}

// HTMLの読み込みが全て完了した後に実行
$(function(){

    // アイドルごとの配置座標を算出
    for (let i = 0; i < idol_names.length; i++) {
        let name = idol_names[i];
        let pr = params['idol'][name]['Pr'];
        let fa = params['idol'][name]['Fa'];
        let an = params['idol'][name]['An'];
        let {x, y} = getPosition(pr, fa, an);
        params['idol'][name]['x'] = x;
        params['idol'][name]['y'] = y;
    }

    // ノードとエッジ
    let nodes = [];
    let edges = [];

    // 説明
    nodes.push({
        id: 'description',
        label: [
            'この枠内を選択後に',
            'アイコンを選ぶと',
            'そのアイドルの',
            'プロフィールが',
            '表示されます',
        ].join('\n'),
        shape: 'box',
        color: {
            background: 'white',
            border: 'gray',
        },
        font: {
            size: 40,
            color: 'gray',
        },
        margin: 10,
        chosen: false,
        fixed: true,
        x: -radius * 2/3,
        y: -radius * 5/6,
    });

    // 星
    nodes.push({
        id: 'you',
        shape: 'star',
        size: 50,
        // borderWidth: 0,
        color: '#56c7c3',
        opacity: 0.8,
        chosen: false,
        fixed: true,
        x: 0,
        y: 0,
    });
    nodes.push({
        id: 'anata',
        label: [
            '質問に答えると',
            'あなたの属性を',
            '表す星印の位置が',
            '更新されます',
        ].join('\n'),
        color: {
            background: 'white',
            border: '#56c7c3',
        },
        shape: 'box',
        font: {
            size: 40,
            color: '#56c7c3',
        },
        margin: 10,
        chosen: false,
        fixed: true,
        x: radius * 2/3,
        y: -radius * 5/6,
    });
    edges.push({
        id: 'you_edge',
        from: 'anata',
        to: 'you',
        arrows: {
            to: {enabled: false},
        },
        width: 3,
        chosen: false,
        color: '#56c7c3',
    });

    // アイドル
    for (let i = 0; i < idol_names.length; i++) {
        let name = idol_names[i];
        let x = params['idol'][name]['x'];
        let y = params['idol'][name]['y'];
        nodes.push({
            id: name + '_dot',
            size: 5,
            borderWidth: 2,
            color: {
                border: 'gray',
                background: 'lightgray',
            },
            shape: 'dot',
            chosen: false,
            fixed: true,
            x: x,
            y: y,
        });
        nodes.push({
            id: name,
            shape: 'image',
            image: './icon/' + name + '.png',
            size: 25,
        });
        edges.push({
            id: name + '_edge',
            from: name,
            to: name + '_dot',
            arrows: {
                to: {enabled: false},
            },
            width: 2,
            chosen: false,
            color: 'gray',
        });
    }

    // PrFaAn
    nodes.push({
        id: 'Pr',
        label: 'Princess',
        color: 'white',
        shape: 'box',
        font: {
            size: 40,
            color: '#ff2284',
            strokeColor: '#ff2284',
            strokeWidth: 1,
        },
        borderWidth: 0,
        chosen: false,
        fixed: true,
        x: 0,
        y: -radius,
    });
    nodes.push({
        id: 'Fa',
        label: 'Fairy',
        color: 'white',
        shape: 'box',
        font: {
            size: 40,
            color: '#005eff',
            strokeColor: '#005eff',
            strokeWidth: 1,
        },
        borderWidth: 0,
        chosen: false,
        fixed: true,
        x: -radius * sin60,
        y: radius * cos60,
    });
    nodes.push({
        id: 'An',
        label: 'Angel',
        color: 'white',
        shape: 'box',
        font: {
            size: 40,
            color: '#ffbb00',
            strokeColor: '#ffbb00',
            strokeWidth: 1,
        },
        borderWidth: 0,
        chosen: false,
        fixed: true,
        x: radius * sin60,
        y: radius * cos60,
    });
    nodes = new vis.DataSet(nodes);
    edges = new vis.DataSet(edges);

    // 描画
    let container = document.getElementById('network');
    let data = {
        nodes: nodes,
        edges: edges
    };
    let options = {
        clickToUse: true,
        nodes: {
        },
        edges: {
        },
        physics: {
            barnesHut: {
                springLength: 50,
                springConstant: 1.0,
                avoidOverlap: 0,
            },
            timestep: 0.1,
        }
    };
    let network = new vis.Network(container, data, options);

    // ローディング
    network.on("stabilizationProgress", function(params_) {
        $('#network_load').text('ロード中 ' + Math.round(params_.iterations / params_.total * 100) + '%');
    });
    network.once("stabilizationIterationsDone", function() {
        $('#network_load').empty();
    });

    // 背景画像
	network.on('beforeDrawing', function(ctx) {
        ctx.drawImage(document.getElementById('triangle'), -402, -460);
    });

    // ノード選択
    network.on('selectNode', function(params_) {  // paramsが被るので一時的にparams_とした
        let id = params_.nodes[0];
        if (idol_names.includes(id)) {
            displayIdol(id, nodes, edges, 'selected');
        }
    });

    // 設問
    for (let i = 0; i < questions.length; i++) {

        // カル―セル
        let question = `<div class="h5 pt-2 pb-2">Q${i + 1}. ${questions[i]}</div>`;
        let answer = $(`<div class="btn-group btn-group-toggle" data-toggle="buttons" id="radio_${i}" />`);
        answer.append(`<label class="btn btn-outline-dark"><input type="radio" value="yes">はい</label>`);
        answer.append(`<label class="btn btn-outline-dark"><input type="radio" value="na">どちらでもない</label>`);
        answer.append(`<label class="btn btn-outline-dark"><input type="radio" value="no">いいえ</label>`);
        let q = $('<div class="carousel-item text-center"></div>');
        q.append(question);
        q.append(answer);
        $('#questions_container .carousel-inner').append(q);
        $('#questions_container .carousel-indicators').append(`<li data-target="#questions_container"></li>`);

        // 回答クリック
        $('#radio_' + i + ' input').on('click', function() {

            // 次の設問へ
            $('#questions_container').carousel('next');

            // indicatorをクリック可能にする
            $('#questions_container .carousel-indicators li').eq(i + 2).attr('data-slide-to', i + 2);
            $('#questions_container .carousel-indicators li').eq(i + 2).css('height', '10px');

            // 予測
            let {pr, fa, an} = predict();

            // パーセントを更新
            updatePercetage(pr, fa, an);

            // 似たアイドルを取得
            let similar_idol = getSimilarIdol(pr, fa, an);

            // 星の位置を更新
            nodes.update({
                id: 'you',
                x: params['idol'][similar_idol]['x'],
                y: params['idol'][similar_idol]['y'],
            });
            // let {x, y} = getPosition(pr, fa, an);
            // nodes.update({
            //     id: 'you',
            //     x: x,
            //     y: y,
            // });

            // 不要な表示を非表示
            nodes.update({
                id: 'anata',
                hidden: true,
            });

            // 最後の設問が終わったら結果へ移動
            if (i + 1 === questions.length) {
                // 結果を表示
                updateResult(pr, fa, an);
                // 似たアイドルを表示
                displayIdol(similar_idol, nodes, edges, 'result');
                // スクロール
                $('html,body').animate({scrollTop: $('#attr_container').offset().top}, 400);
                // 開始ボタンの表示を変更
                $('#start_button').text('回答を修正する');

                // イベントトラッキング
                let label = similar_idol;
                for (let j = 0; j < questions.length; j++) {
                    let answer = $('#radio_' + j + ' label.active input').val();
                    if (answer === 'yes') {
                        label += ',+';
                    }
                    else if (answer === 'no') {
                        label += ',-';
                    }
                    else if (answer === 'na') {
                        label += ', ';
                    }
                }
                gtag('event', '20201024', {
                    'event_category': 'ミリシタ属性診断',
                    'event_label': label,
                });
            }
            // 一度診断した後は回答を変更するごとに結果を変更
            else if ($('#result_container').is(':visible')) {
                // 結果を表示
                updateResult(pr, fa, an);
                // 似たアイドルを表示
                displayIdol(similar_idol, nodes, edges, 'result');
            }
        });
    }

    // 開始ボタン
    $('#start_button').on('click', function () {
        $('#questions_container .carousel-indicators li').eq(1).attr('data-slide-to', 1);
        $('#questions_container .carousel-indicators li').eq(1).css('height', '10px');
        $('#questions_container').carousel('next');
    });
});
