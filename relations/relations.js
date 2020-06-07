// // タッチ対応端末か否かを判定
// let touch = false;
// if(window.ontouchstart !== undefined && 0 < navigator.maxTouchPoints) {
//     touch = true;
// }

// jsonを読込
$.getJSON('https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/koshou/koshou.json', function (json) {
    let keys = Object.keys(json);
    let names = json['names'];

    // ノード
    let nodes = [];
    for (let i = 0; i < 52; i++) {
        const name = names[i];
        nodes.push({
            id: i,
            label: name,
            // color: 'red',  // 後でキャラカラーに変更
            shape: 'image',
            image: 'https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/icon/2nd/' + name + '.png',
            font: {
                background: 'white',
            },
        });
    }
    nodes = new vis.DataSet(nodes);

    // エッジ
    let edges = new vis.DataSet([]);

    // 描画
    let container = document.getElementById('network');
    let data = {
        nodes: nodes,
        edges: edges
    };
    let options = {
        nodes: {
            size: 30,
            borderWidth: 5,
        },
        edges: {
            color: {
                color: '#808080',
            },
            arrows: 'to',
        },
        physics: {
            barnesHut: {
                springLength: 200,
                springConstant: 0.1,
                avoidOverlap: 0.5,
            },
        }
    };
    let network = new vis.Network(container, data, options);

    // ノード選択
    network.on('selectNode', function(params) {
        edges.clear();
        let i = params.nodes[0];
        const name1 = names[i];
        for (let j = 0; j < 52; j++) {
            const name2 = names[j];
            let datum = json[name1][name2];
            if (datum['呼称（ミリシタ）'] != '' && datum['label'] != datum['pred']) {
                edges.update({
                    from: i,
                    to: j,
                    label: datum['呼称（ミリシタ）'],
                });
            }
            datum = json[name2][name1];
            if (datum['呼称（ミリシタ）'] != '' && datum['label'] != datum['pred']) {
                edges.update({
                    from: j,
                    to: i,
                    label: datum['呼称（ミリシタ）'],
                });
            }
        }
    });

});
