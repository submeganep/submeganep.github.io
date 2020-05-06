$.getJSON('https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/costume/costume.json', function (data) {
    let keys = Object.keys(data);


    function displayCostume(key) {
        const url_img = 'https://raw.githubusercontent.com/submeganep/submeganep.github.io/master/costume/original/' + key + '.png';

        let names = $('<div class="idol_names"></div>');
        for (let name of data[key]['idol']) {
            names.append('<a href="#top" class="idol_name" id="' + name + '">' + name + '</a>');
            break;  // 多人数の場合に表示が横に広くなるのでとりえあえず一人だけに限定
        }
        if (data[key]['idol'].length > 1) {
            names.append(' 他');
        }

        let colors = $('<div class="costume_colors"></div>');
        for (let color of data[key]['mean']) {
            colors.append('<a href="#top"><div class="costume_color" style="background-color: ' + color + ';"></div></a>');
        }

        let item = $('<div class="costume_item"></div>');
        item.append('<span class="costume_name">' + data[key]['name'] + '</span>');
        // item.append('<span class="idol_name" id="' +  + '">' + data[key]['idol'] + '</span>');
        item.append(names);
        item.append('<div class="costume_image" id="' + key + '"><a href="#top"><img src="' + url_img + '"></a></div>');
        item.append(colors);
        let description = data[key.split('_')[0]]['description'].replace(/\r?\n/g, '<br>');
        item.append('<span class="costume_description">' + description + '</span>');
        // let description_hover = data[key]['description'].replace(/\r?\n/g, '<br>');
        // item.append('<span class="costume_description_hover">' + description_hover + '</span>');
        $('.costume_container').append(item);
        $('#' + key).on('click', function() {
            $('.costume_container').empty();
            displaySimilarCostumes(key);
        });
        for (let name of data[key]['idol']) {
            $('#' + name).on('click', function() {
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

    // displaySimilarCostumes('041fuk0034');
    displayIdolCostumes('天海春香');


    
});
