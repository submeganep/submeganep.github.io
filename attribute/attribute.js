
let tune_names = Object.keys(tunes);
let idol_names = Object.keys(params['idol']);
let questions = params['question'];

// 配置座標算出用の定数
const sin60 = Math.sin(Math.PI / 3.0);
const cos60 = Math.cos(Math.PI / 3.0);
const radius = 500;

// 配置座標を算出する関数
function getPosition(pr, fa, an) {
    let x = (fa - an) * sin60;
    let y = (fa + an) * cos60 - pr;
    x = Math.ceil(x * radius);
    y = Math.ceil(y * radius);
    return {x, y};
}

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

// アイドル詳細表示
function displayIdol(name, nodes, edges) {

    // アイコンを拡大する
    let x = params['idol'][name]['x'];
    let y = params['idol'][name]['y'];    
    for (let i = 0; i < idol_names.length; i++) {
        nodes.update({
            id: idol_names[i],
            hidden: false,
        });
    }
    nodes.update({
        id: name,
        hidden: true,
    });
    nodes.remove('selected');
    nodes.add({
        id: 'selected',
        shape: 'image',
        image: './icon/' + name + '.png',
        size: 75,
        mass: 10,
        shadow: true,
        fixed: true,
        x: x,
        y: y,
    });

    // アイドルのプロフィールを表示
    $('#idol_container').empty();
    let idol = params['idol'][name];

    // アイドル名
    $('#idol_container').append('<div class="idol_eng">' + idol['Given'] + ' ' + idol['Family'] + '</div>');
    $('#idol_container').append('<div class="idol_name" style="color: ' + idol['カラーコード'] + ';">' + name + '</div>');

    // 紹介文
    let introduction = $('<div class="idol_introduction"></div>');
    introduction.append('<div>' + idol['ミリシタ紹介文'].replace(/\r?\n/g, '<br>') + '</div>');
    $('#idol_container').append(introduction);
    
    // 検索
    let name_niconico = name;
    let name_pixiv = name;
    if (name == 'ロコ') {
        name_niconico = 'ロコ%28アイドルマスター%29';
        name_pixiv = '伴田路子';
    }
    else if (name == 'ジュリア') {
        name_niconico += '%28アイドルマスター%29';
        name_pixiv += '%28アイマス%29';
    }
    if (name == 'エミリー') {
        name_niconico = 'エミリー%20スチュアート';
        name_pixiv = 'エミリー・スチュアート';
    }
    let search = '';
    search += '<a href="https://dic.nicovideo.jp/a/' + name_niconico + '" target="_blank">ニコニコ大百科</a>';
    search += '<br>';
    search += '<a href="https://dic.pixiv.net/a/' + name_pixiv + '" target="_blank">ピクシブ百科事典</a>';

    // プロフィール
    let table = $('<table></table>');
    table.append('<tr><td>趣味</td><td>' + idol['趣味'] + '</td></tr>');
    table.append('<tr><td>特技</td><td>' + idol['特技'] + '</td></tr>');
    table.append('<tr><td>好きなもの</td><td>' + idol['好きなもの'] + '</td></tr>');
    table.append('<tr><td>身長 / 体重</td><td>' + idol['身長'] + 'cm / ' + idol['体重'] + 'kg</td></tr>');
    table.append('<tr><td>スリーサイズ</td><td>' + idol['B'] + '-' + idol['W'] + '-' + idol['H'] + '</td></tr>');
    table.append('<tr><td>血液型</td><td>' + idol['血液型'] + '型</td></tr>');
    table.append('<tr><td>利き手</td><td>' + idol['利き手'] + '</td></tr>');
    table.append('<tr><td>出身地</td><td>' + idol['出身地'] + '</td></tr>');
    table.append('<tr><td>誕生日</td><td>' + idol['誕生日'] + '</td></tr>');
    table.append('<tr><td>年齢</td><td>' + idol['年齢'] + '歳</td></tr>');
    table.append('<tr><td>属性</td><td>' + idol['PrFaAn'] + ' / ' + idol['VoDaVi'] + '</td></tr>');
    table.append('<tr><td>CV</td><td>' + idol['CV'] + '</td></tr>');
    table.append('<tr><td>検索</td><td>' + search + '</td></tr>');
    $('#idol_container').append(table);

    // 背景
    // idol['ID']  // 03みたいなIDを背景右上に表示するとカッコいいかも
    $('#idol_container').css('background-image', 'url(./standing/' + name + '.png)');

    // 楽曲
    $('#tunes_header').empty();
    $('#tunes_header').append('<div class="container_header">▼ ' + name + 'の楽曲（楽曲名を選択して視聴）</div>')
    $('#tunes_container').empty();
    for (let i = 0; i < tune_names.length; i++) {
        let tune_name = tune_names[i];
        let tune = tunes[tune_name];
        if (tune['idol_names'].includes(name)) {
            if (tune['idol_names'].length > 5) {
                continue;
            }
            let tune_container = $('<div class="tune_container"></div>');
            tune_container.append('<div id="player_' + i + '"></div>');
            tune_container.append('<div class="tune_name"><a id="tune_' + i + '">' + tune_name + '</a></div>');
            tune_container.append('<div class="unit_name">' + tune['unit_name'] + '</div>');
            let tune_idols = $('<div class="tune_idols"></div>');
            for (let idol_name of tune['idol_names']) {
                tune_idols.append('<img src="./icon/' + idol_name + '.png" style="width: 60px;">');
            }
            tune_container.append(tune_idols);
            $('#tunes_container').append(tune_container);

            $('#tune_' + i).on('click', function() {
                if (!($('#player_' + i + ' iframe').length)) {
                    let url = tune['url'];
                    // let url = tune['url'].replace('http://', 'https://');
                    $('#player_' + i).append('<iframe src="' + url + '" id="ytplayer" type="text/html" width="320" height="180" frameborder="0"></iframe>');
                }
            });
        }
    }
}

// 診断
function diagnose(nodes, edges) {

    // スコアを算出
    let pr = params['coef']['Pr'][questions.length];
    let fa = params['coef']['Fa'][questions.length];
    let an = params['coef']['An'][questions.length];
    for (let i = 0; i < questions.length; i++) {
        if ($('#yes_' + i).hasClass('selected')) {
            pr += params['coef']['Pr'][i];
            fa += params['coef']['Fa'][i];
            an += params['coef']['An'][i];
        }
        else if ($('#no_' + i).hasClass('selected')) {
            pr += params['coef']['Pr'][i + questions.length];
            fa += params['coef']['Fa'][i + questions.length];
            an += params['coef']['An'][i + questions.length];
        }
        else if ($('#neutral_' + i).hasClass('selected')) {
        }
        else {
            return;
        }
    }
    if (pr + fa + an == 0) {  // 全て「どちらでもない」場合
        $('#result_container').empty();
        $('#idol_container').empty();
        $('#idol_container').css('background', '');
        $('#tunes_header').text('');
        return;
    }
    pr = 1 / (1 + Math.exp(-pr));
    fa = 1 / (1 + Math.exp(-fa));
    an = 1 / (1 + Math.exp(-an));
    let sum = pr + fa + an;
    pr /= sum;
    fa /= sum;
    an /= sum;
    let {x, y} = getPosition(pr, fa, an);

    // 属性
    let max_score = Math.max(pr, fa, an);
    let result_summary = '';
    let result_detail = '';
    let result_percent = '';
    if (pr == max_score){
        result_summary = 'あたなはどこからどうみても<span class="attribute pr">Princess</span>です！';
        result_detail = '気持ちがまっすぐで周囲を巻き込んでいくパワーを持つあなたは、どうみてもプリンセスです。友達想いのあなたの周りにはいつも楽しい空気が流れているはず。もしかしたら自分では気付いていないかもしれませんが、あなたの一生懸命さにみんな勇気づけられていますよ！';
    } else if (fa == max_score) {
        result_summary = 'あなたは周囲の人から<span class="attribute fa">Fairy</span>だと思われています！';
        result_detail = '全身からかっこよさが溢れ、物事を深く考えがちなあなたは、普段からフェアリーだなと思われています。自他共に妥協を許さない姿勢はなにかと周りのレベルを引き上げているはず。落ち込むことも多いかもしれませんが、あなたの魅力に気付いている人はあなたが思うよりずっとたくさんいますよ！';
    } else {
        result_summary = 'あなたは<span class="attribute an">Angel</span>っぽいところがあるみたいですね～！';
        result_detail = '癒やしの空気を纏い自然体で生きるあなたは、エンジェルっぽいです！人と違うテンポで生きているあなたは、周りの人が越えられないハードルも簡単に飛び越えてみせているはず。きっと気にしていないとは思いますが、あなたの楽しく過ごす姿に心が安らいでいる人もいっぱいいますよ！';
    }
    result_percent += '<span class="attribute pr">Princess ' + Math.round(pr * 100) + '%</span>';
    result_percent += '<span class="attribute fa">Fairy ' + Math.round(fa * 100) + '%</span>';
    result_percent += '<span class="attribute an">Angel ' + Math.round(an * 100) + '%</span>';
    $('#result_container').empty();
    $('#result_container').append('<div class="container_header">▼ 診断結果</div>')
    $('#result_container').append('<div id="result_summary">' + result_summary + '</div>');
    $('#result_container').append('<div id="result_percent">' + result_percent + '</div>');
    $('#result_container').append('<div id="result_detail">' + result_detail + '</div>');

    // 設問への回答が最も似ているアイドル
    let idol_similar = '';
    let best_similarity = 0;
    for (let i = 0; i < idol_names.length; i++) {
        let name = idol_names[i];
        let answer = params['idol'][name]['answer'];
        let similarity = 0;
        for (let j = 0; j < answer.length; j++) {
            if (answer[j] > 0 & $('#yes_' + j).hasClass('selected')) {
                similarity++;
            } else if (answer[j] == 0 & $('#no_' + j).hasClass('selected')) {
                similarity++;
            }
        }
        if (similarity > best_similarity) {
            best_similarity = similarity;
            idol_similar = name;
        }
    }

    // 座標が最も近いアイドル
    let idol_nearest = '';
    let best_dist = 2.0;
    for (let i = 0; i < idol_names.length; i++) {
        let name = idol_names[i];
        let pr_diff = pr - params['idol'][name]['Pr'];
        let fa_diff = fa - params['idol'][name]['Fa'];
        let an_diff = an - params['idol'][name]['An'];
        let dist = pr_diff ** 2 + fa_diff ** 2 + an_diff ** 2;
        if (dist < best_dist) {
            best_dist = dist;
            idol_nearest = name;
        }
    }
    $('#result_container').append('<div id="result_idol">似ているアイドルは <a id="link_' + idol_similar + '">' + idol_similar + '</a> です</div>');
    $('#link_' + idol_similar).on('click', function() {
        displayIdol(idol_similar, nodes, edges);
    });

    // アイドルのプロフィールを表示
    displayIdol(idol_similar, nodes, edges);

    // 星を表示
    nodes.update({
        id: 'you',
        x: x,
        y: y,
    });

}

function click_button(i) {
    $('#yes_' + i).removeClass('selected');
    $('#no_' + i).removeClass('selected');
    $('#neutral_' + i).removeClass('selected');
    let next = $('#q_' + (i + 1));
    // 次の設問を開く
    if (next.is(':hidden')) {
        next.slideDown(400);
        $('html,body').animate({scrollTop: next.offset().top}, 400);
        $('#progress_bar').val(i + 2);
        $('#progress_text').text((i + 2) + ' / ' + questions.length);
    }
    // 全ての設問に回答
    if (i + 1 == questions.length) {
        $('#progress_container').hide();
        $('html,body').animate({scrollTop: $('#result_container').offset().top}, 400);
        // $('#network').show();
    }
}

// HTMLの読み込みが全て完了した後に実行
$(function(){

    // ノードとエッジ
    let nodes = [];
    let edges = [];

    // 星
    nodes.push({
        id: 'you',
        shape: 'star',
        size: 75,
        // borderWidth: 0,
        color: '#56c7c3',
        opacity: 0.8,
        chosen: false,
        fixed: true,
        x: 0,
        y: 0,
    });
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
        // shape: 'dot',
        // color: '#ff2284',
        color: 'white',
        font: {
            color: '#ff2284',
            size: 30,
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
        // shape: 'dot',
        // color: '#005eff',
        color: 'white',
        font: {
            color: '#005eff',
            size: 30,
        },
        borderWidth: 0,
        chosen: false,
        fixed: true,
        x: radius * sin60,
        y: radius * cos60,
    });
    nodes.push({
        id: 'An',
        label: 'Angel',
        // shape: 'dot',
        // color: '#ffbb00',
        color: 'white',
        font: {
            color: '#ffbb00',
            size: 30,
        },
        borderWidth: 0,
        chosen: false,
        fixed: true,
        x: -radius * sin60,
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

    // 背景画像
	network.on('beforeDrawing', function(ctx) {
        ctx.drawImage(document.getElementById('triangle'), -402, -460);
        // ctx.drawImage(document.getElementById('triangle'), -402, -454);
    });

    // ノード選択
    network.on('selectNode', function(params_) {  // paramsが被るので一時的にparams_とした
        let id = params_.nodes[0];
        if (idol_names.includes(id)) {
            displayIdol(id, nodes, edges);
        }
    });

    // 設問
    for (let i = 0; i < questions.length; i++) {
        let q = $('<div class="question_container" id="q_' + i + '"></div>');
        q.append('<div class="question_text">Q' + (i + 1) + '. ' + questions[i] + '</div>');
        let button = $('<div class="button_container"></div>');
        button.append('<div class="answer_button" id="yes_' + i + '">はい</div>');
        button.append('<div class="answer_button" id="neutral_' + i + '">どちらでもない</div>');
        button.append('<div class="answer_button" id="no_' + i + '">いいえ</div>');
        q.append(button);
        $('#questions_container').append(q);
        // クリック
        $('#yes_' + i).on('click', function () {
            click_button(i);
            $('#yes_' + i).addClass('selected');
            diagnose(nodes, edges);
        });
        $('#neutral_' + i).on('click', function () {
            click_button(i);
            $('#neutral_' + i).addClass('selected');
            diagnose(nodes, edges);
        });
        $('#no_' + i).on('click', function () {
            click_button(i);
            $('#no_' + i).addClass('selected');
            diagnose(nodes, edges);
        });
    }

    // 開始ボタン
    $('#start_button').on('click', function () {
        $('#start_button').hide();
        $('#q_0').slideDown(400);
        $('html,body').animate({scrollTop: $('#q_0').offset().top}, 400);

        
        $('#progress_container').append('<div id="progress_text">1 / ' + questions.length + '</div>');
        $('#progress_container').append('<progress id="progress_bar" min="0" max="' + questions.length + '" value="1"></progress>');
    });

    
});
