window.onload = function () {
    var competenceBlock = document.querySelector('#competence-block'),
        competences = document.querySelector('#competences'),
        groupedByComp = document.querySelector('#grouped-competences'),
        level = document.querySelector('#level'),
        theadRow = document.querySelector('.thead-row'),
        xhr = new XMLHttpRequest(),
        competenceList,
        fields;

    xhr.open('GET', 'competences.csv', true);
    xhr.send();

    function csvJSON(csv) {
        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }
        fields = Object.keys(result[0]);
        //return result; //JavaScript object
        return result; //JSON
    }

    xhr.onload = function () {
        var json = csvJSON(this.response),
            grouped = _.chain(json).groupBy('Компетенция');

      /*  _.without(fields, 'Должность', 'Департамент').forEach(function (elem) {
            var fieldName = document.createElement('th');
            fieldName.textContent = elem;
            theadRow.appendChild(fieldName);
        });*/

        competenceList = json;

        grouped.each(function (elem, i) {
            var container = document.createElement('article'),
                index = i.replace('\"\'', '');

            container.classList.add('pb-checkbox-container');
            container.innerHTML = `<input type="checkbox" hidden value=${index} id=${index}><label for=${index} class=pb-checkbox-label>${index}</label><div class="pb-checkbox-shape"></div>`;

           groupedByComp.appendChild(container);
        });
       /* groupedByComp.appendChild(grouped.reduce(function (accum, elem, index) {
            var article = `<article class="pb-checkbox-container"><input type="checkbox" hidden value="${index}" id="${index}"><label for="${index}" class="pb-checkbox-label">${index}</label>`;

            option.value = option.textContent = index;
            accum.appendChild(option);

            return accum;
        }, document.createDocumentFragment()).value());*/

  /*      _.chain(json).pluck('Компетенция').uniq().each(function (elem) {
           var option = document.createElement('option');
           option.value = option.textContent = elem;
           competences.appendChild(option);
        });

        _.chain(json).pluck('Блок компетенций').uniq().each(function (elem) {
            var option = document.createElement('option');
            option.value = option.textContent = elem;
            competenceBlock.appendChild(option);
        });

        _.chain(json).findWhere('Уровень').uniq().each(function (elem) {
            var option = document.createElement('option');
            option.value = option.textContent = elem;
            level.appendChild(option);
        });
*/
      /*  document.querySelector('.tbody').appendChild(competenceList.reduce(function (accum, person) {
            var tr = document.createElement('tr');

            _.each(_.omit(person, 'Должность', 'Департамент'), function (field) {
                var td = document.createElement('td');

                td.textContent = field;
                tr.appendChild(td);
            });

            accum.appendChild(tr);

            return accum;
        }, document.createDocumentFragment()))*/
    };

};