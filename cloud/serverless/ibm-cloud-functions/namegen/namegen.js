function namegen(params) {

    const generator = require('fantasy-name-generator');
    const usage = "-p race [see https://www.npmjs.com/package/fantasy-name-generator] -p gender [male|female]"

    if (params === undefined || params.race === undefined ||
        params.gender === undefined || ( params.gender != 'male' && params.gender != 'female' )) {
            return { usage: usage };
        }

    var name = generator.nameByRace(params.race,{gender: params.gender});

    return{ name: name };
}

exports.main = namegen;